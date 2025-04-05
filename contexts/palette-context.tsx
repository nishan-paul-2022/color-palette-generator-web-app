import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { ColorSegment, SegmentSet } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { createContext, ReactNode, useContext, useState } from "react";

// Default values
const DEFAULT_SET: SegmentSet = {
  id: "default",
  name: "DEFAULT",
  segments: [],
};

// Context type
interface PaletteContextType {
  // Sets
  sets: SegmentSet[];
  activeSetId: string;
  activeSet: SegmentSet;

  // Set operations
  createSet: (name: string) => void;
  updateSetName: (id: string, name: string) => void;
  deleteSet: (id: string) => void;
  setActiveSet: (id: string) => void;

  // Segments
  addSegment: (segment: Omit<ColorSegment, "id">) => void;
  updateSegment: (
    id: string,
    updates: Partial<Omit<ColorSegment, "id">>
  ) => void;
  deleteSegment: (id: string) => void;
  reorderSegments: (startIndex: number, endIndex: number) => void;

  // Selection
  selectedSegments: string[];
  selectionMode: boolean;
  toggleSelectionMode: () => void;
  toggleSegmentSelection: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  deleteSelected: () => void;
}

// Create the context
export const PaletteContext = createContext<PaletteContextType | undefined>(
  undefined
);

// Provider props
interface PaletteProviderProps {
  children: ReactNode;
}

// Context provider component
export function PaletteProvider({ children }: PaletteProviderProps) {
  // Load data from localStorage
  const [sets, setSets] = useLocalStorage<SegmentSet[]>("colorPaletteSets", [
    DEFAULT_SET,
  ]);
  const [activeSetId, setActiveSetId] = useLocalStorage<string>(
    "colorPaletteActiveSetId",
    "default"
  );

  // UI state
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  const { toast } = useToast();

  // Get active set
  const activeSet = sets.find((set) => set.id === activeSetId) || sets[0];

  // Create a new set
  const createSet = (name: string) => {
    if (!name.trim()) return;

    const newSet: SegmentSet = {
      id: generateId(),
      name: name.trim(),
      segments: [],
    };

    setSets([...sets, newSet]);
    setActiveSetId(newSet.id);

    toast({
      description: `Set "${name}" created successfully.`,
    });
  };

  // Update set name
  const updateSetName = (id: string, name: string) => {
    if (!name.trim()) return;

    setSets(
      sets.map((set) => (set.id === id ? { ...set, name: name.trim() } : set))
    );

    toast({
      description: `Set renamed to "${name}".`,
    });
  };

  // Delete a set
  const deleteSet = (id: string) => {
    // Don't delete if it's the only set
    if (sets.length <= 1) {
      toast({
        title: "Cannot delete set",
        description: "You must have at least one set of segments.",
        variant: "destructive",
      });
      return;
    }

    // Find the index of the set to delete
    const setIndex = sets.findIndex((set) => set.id === id);

    // Create a new array without the deleted set
    const newSets = sets.filter((set) => set.id !== id);

    // If deleting the active set, switch to another set
    if (id === activeSetId) {
      // If deleting the first set, activate the new first set
      // If deleting any other set, activate the previous set
      const newActiveIndex = setIndex === 0 ? 0 : setIndex - 1;
      setActiveSetId(newSets[newActiveIndex].id);
    }

    setSets(newSets);

    toast({
      description: "Set deleted successfully.",
    });
  };

  // Add a new segment
  const addSegment = (segment: Omit<ColorSegment, "id">) => {
    if (!segment.color || !segment.title) return;

    const newSegment: ColorSegment = {
      id: generateId(),
      ...segment,
    };

    setSets(
      sets.map((set) =>
        set.id === activeSetId
          ? { ...set, segments: [...set.segments, newSegment] }
          : set
      )
    );
  };

  // Update an existing segment
  const updateSegment = (
    id: string,
    updates: Partial<Omit<ColorSegment, "id">>
  ) => {
    setSets(
      sets.map((set) =>
        set.id === activeSetId
          ? {
              ...set,
              segments: set.segments.map((segment) =>
                segment.id === id ? { ...segment, ...updates } : segment
              ),
            }
          : set
      )
    );
  };

  // Delete a segment
  const deleteSegment = (id: string) => {
    setSets(
      sets.map((set) =>
        set.id === activeSetId
          ? {
              ...set,
              segments: set.segments.filter((segment) => segment.id !== id),
            }
          : set
      )
    );

    // Also remove from selection if it's there
    setSelectedSegments(selectedSegments.filter((segId) => segId !== id));
  };

  // Reorder segments (after drag and drop)
  const reorderSegments = (startIndex: number, endIndex: number) => {
    setSets(
      sets.map((set) => {
        if (set.id !== activeSetId) return set;

        const newSegments = [...set.segments];
        const [removed] = newSegments.splice(startIndex, 1);
        newSegments.splice(endIndex, 0, removed);

        return {
          ...set,
          segments: newSegments,
        };
      })
    );
  };

  // Toggle selection mode
  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      setSelectedSegments([]);
    }
  };

  // Toggle selection of a segment
  const toggleSegmentSelection = (id: string) => {
    if (selectedSegments.includes(id)) {
      setSelectedSegments(selectedSegments.filter((segId) => segId !== id));
    } else {
      setSelectedSegments([...selectedSegments, id]);
    }
  };

  // Select all segments
  const selectAll = () => {
    setSelectedSegments(activeSet.segments.map((seg) => seg.id));
  };

  // Deselect all segments
  const deselectAll = () => {
    setSelectedSegments([]);
  };

  // Delete selected segments
  const deleteSelected = () => {
    setSets(
      sets.map((set) =>
        set.id === activeSetId
          ? {
              ...set,
              segments: set.segments.filter(
                (segment) => !selectedSegments.includes(segment.id)
              ),
            }
          : set
      )
    );
    setSelectedSegments([]);
  };

  // Context value
  const value: PaletteContextType = {
    sets,
    activeSetId,
    activeSet,
    createSet,
    updateSetName,
    deleteSet,
    setActiveSet: setActiveSetId,
    addSegment,
    updateSegment,
    deleteSegment,
    reorderSegments,
    selectedSegments,
    selectionMode,
    toggleSelectionMode,
    toggleSegmentSelection,
    selectAll,
    deselectAll,
    deleteSelected,
  };

  return (
    <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
  );
}

// Custom hook to use the palette context
export function usePalette() {
  const context = useContext(PaletteContext);

  if (context === undefined) {
    throw new Error("usePalette must be used within a PaletteProvider");
  }

  return context;
}

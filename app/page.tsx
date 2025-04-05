"use client";

import { Button } from "@/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { Input } from "@/components/input";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Check,
  CheckSquare,
  Download,
  Edit,
  GripVertical,
  MoreHorizontal,
  Palette,
  Pencil,
  Plus,
  PlusCircle,
  Square,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import AppIcon from "@/public/icon.svg";

interface ColorSegment {
  id: string;
  color: string;
  title: string;
}

interface SegmentSet {
  id: string;
  name: string;
  segments: ColorSegment[];
}

// Function to determine if text should be white or black based on background color
function getContrastTextColor(hexColor: string): string {
  // Remove the # if it exists
  const color = hexColor.charAt(0) === "#" ? hexColor.substring(1) : hexColor;

  // Convert to RGB
  const r = Number.parseInt(color.substring(0, 2), 16) || 0;
  const g = Number.parseInt(color.substring(2, 4), 16) || 0;
  const b = Number.parseInt(color.substring(4, 6), 16) || 0;

  // Calculate luminance - using the formula for relative luminance in the sRGB color space
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white for dark colors, black for light colors
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

function SortableSegment({
  segment,
  onEdit,
  onDelete,
  isSelected,
  onSelect,
  selectionMode,
}: {
  segment: ColorSegment;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
  selectionMode: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: segment.id });
  const { toast } = useToast();
  const [titleCopied, setTitleCopied] = useState(false);
  const [colorCopied, setColorCopied] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const textColor = getContrastTextColor(segment.color);

  const copyToClipboard = (text: string, type: "title" | "color") => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "title") {
        setTitleCopied(true);
        setTimeout(() => setTitleCopied(false), 2000);
      } else {
        setColorCopied(true);
        setTimeout(() => setColorCopied(false), 2000);
      }

      toast({
        description: `${
          type === "title" ? "Title" : "Color code"
        } copied to clipboard!`,
        duration: 2000,
      });
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`w-full border rounded-md mb-3 overflow-hidden ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      onClick={() => selectionMode && onSelect(segment.id)}
    >
      <div className="flex items-stretch">
        {selectionMode ? (
          <div className="p-4 bg-background flex items-center justify-center">
            {isSelected ? (
              <CheckSquare className="h-5 w-5 text-primary" />
            ) : (
              <Square className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        ) : (
          <div
            className="p-4 cursor-grab bg-background"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
        )}

        <div
          className="flex-grow relative"
          style={{ backgroundColor: segment.color }}
        >
          <div className="absolute inset-0 p-4 flex flex-col justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="font-bold text-lg hover:underline focus:outline-none text-left"
                    style={{
                      color: textColor,
                      textShadow: `0 1px 2px ${
                        textColor === "#ffffff"
                          ? "rgba(0,0,0,0.5)"
                          : "rgba(255,255,255,0.5)"
                      }`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(segment.title, "title");
                    }}
                  >
                    {titleCopied ? (
                      <span className="flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        {segment.title}
                      </span>
                    ) : (
                      segment.title
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to copy title</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="text-sm mt-1 hover:underline focus:outline-none text-left"
                    style={{
                      color: textColor,
                      textShadow: `0 1px 2px ${
                        textColor === "#ffffff"
                          ? "rgba(0,0,0,0.5)"
                          : "rgba(255,255,255,0.5)"
                      }`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(segment.color, "color");
                    }}
                  >
                    {colorCopied ? (
                      <span className="flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        {segment.color}
                      </span>
                    ) : (
                      segment.color
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to copy color code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {!selectionMode && (
          <div className="p-4 flex gap-2 bg-background">
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(segment.id);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(segment.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ColorSegmentGenerator() {
  // State for sets of segments
  const [sets, setSets] = useState<SegmentSet[]>([
    {
      id: "default",
      name: "Default Set",
      segments: [],
    },
  ]);
  const [activeSetId, setActiveSetId] = useState("default");
  const [showSetDialog, setShowSetDialog] = useState(false);
  const [newSetName, setNewSetName] = useState("");
  const [editingSetId, setEditingSetId] = useState<string | null>(null);

  // State for segments within the active set
  const [newColor, setNewColor] = useState("#6E56CF");
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  // Export state
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportWidth, setExportWidth] = useState(800);
  const [exportHeight, setExportHeight] = useState(600);
  const [exportOrientation, setExportOrientation] = useState<
    "horizontal" | "vertical"
  >("horizontal");
  const [exportShowTitles, setExportShowTitles] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const textColor = getContrastTextColor(newColor);

  // Get the active set
  const activeSet = sets.find((set) => set.id === activeSetId) || sets[0];

  // Get segments from the active set
  const segments = activeSet.segments;

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedSets = localStorage.getItem("colorPaletteSets");
    if (savedSets) {
      try {
        const parsedSets = JSON.parse(savedSets);
        setSets(parsedSets);
      } catch (error) {
        console.error("Failed to parse saved sets:", error);
      }
    }

    const savedActiveSetId = localStorage.getItem("colorPaletteActiveSetId");
    if (savedActiveSetId) {
      setActiveSetId(savedActiveSetId);
    }
  }, []);

  // Save data to localStorage whenever sets or activeSetId changes
  useEffect(() => {
    localStorage.setItem("colorPaletteSets", JSON.stringify(sets));
    localStorage.setItem("colorPaletteActiveSetId", activeSetId);
  }, [sets, activeSetId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const openColorPicker = () => {
    document.getElementById("color-picker")?.click();
  };

  const addOrUpdateSegment = () => {
    if (newColor && newTitle) {
      if (editingId) {
        // Update existing segment
        setSets(
          sets.map((set) =>
            set.id === activeSetId
              ? {
                  ...set,
                  segments: set.segments.map((segment) =>
                    segment.id === editingId
                      ? { ...segment, color: newColor, title: newTitle }
                      : segment
                  ),
                }
              : set
          )
        );
        setEditingId(null);
      } else {
        // Add new segment
        const newSegment: ColorSegment = {
          id: Date.now().toString(),
          color: newColor,
          title: newTitle,
        };

        setSets(
          sets.map((set) =>
            set.id === activeSetId
              ? { ...set, segments: [...set.segments, newSegment] }
              : set
          )
        );
      }

      // Reset form
      setNewTitle("");
      setNewColor("#6E56CF");
    }
  };

  const handleEdit = (id: string) => {
    const segmentToEdit = segments.find((segment) => segment.id === id);
    if (segmentToEdit) {
      setNewColor(segmentToEdit.color);
      setNewTitle(segmentToEdit.title);
      setEditingId(id);
    }
  };

  const handleDelete = (id: string) => {
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

    if (editingId === id) {
      setEditingId(null);
      setNewColor("#6E56CF");
      setNewTitle("");
    }
    setSelectedSegments(selectedSegments.filter((segId) => segId !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSets(
        sets.map((set) =>
          set.id === activeSetId
            ? {
                ...set,
                segments: arrayMove(
                  set.segments,
                  set.segments.findIndex((item) => item.id === active.id),
                  set.segments.findIndex((item) => item.id === over.id)
                ),
              }
            : set
        )
      );
    }
  };

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      setSelectedSegments([]);
    }
  };

  const toggleSegmentSelection = (id: string) => {
    if (selectedSegments.includes(id)) {
      setSelectedSegments(selectedSegments.filter((segId) => segId !== id));
    } else {
      setSelectedSegments([...selectedSegments, id]);
    }
  };

  const selectAll = () => {
    setSelectedSegments(segments.map((seg) => seg.id));
  };

  const deselectAll = () => {
    setSelectedSegments([]);
  };

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

  const addNewSet = () => {
    if (newSetName.trim()) {
      const newSet: SegmentSet = {
        id: Date.now().toString(),
        name: newSetName.trim(),
        segments: [],
      };

      setSets([...sets, newSet]);
      setActiveSetId(newSet.id);
      setNewSetName("");
      setShowSetDialog(false);

      toast({
        description: `Set "${newSetName}" created successfully.`,
      });
    }
  };

  const updateSetName = () => {
    if (editingSetId && newSetName.trim()) {
      setSets(
        sets.map((set) =>
          set.id === editingSetId ? { ...set, name: newSetName.trim() } : set
        )
      );

      setEditingSetId(null);
      setNewSetName("");
      setShowSetDialog(false);

      toast({
        description: `Set renamed to "${newSetName}".`,
      });
    }
  };

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

  const openEditSetDialog = (id: string) => {
    const setToEdit = sets.find((set) => set.id === id);
    if (setToEdit) {
      setEditingSetId(id);
      setNewSetName(setToEdit.name);
      setShowSetDialog(true);
    }
  };

  const exportAsImage = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    canvas.width = exportWidth;
    canvas.height = exportHeight;

    // Fill background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get segments to export (either selected or all)
    const segmentsToExport =
      selectedSegments.length > 0
        ? segments.filter((seg) => selectedSegments.includes(seg.id))
        : segments;

    if (segmentsToExport.length === 0) {
      toast({
        title: "No segments to export",
        description: "Please create or select segments to export.",
        variant: "destructive",
      });
      return;
    }

    // Calculate segment dimensions
    let segmentWidth, segmentHeight, startX, startY;

    if (exportOrientation === "horizontal") {
      segmentWidth = canvas.width / segmentsToExport.length;
      segmentHeight = canvas.height;
      startX = 0;
      startY = 0;
    } else {
      segmentWidth = canvas.width;
      segmentHeight = canvas.height / segmentsToExport.length;
      startX = 0;
      startY = 0;
    }

    // Draw segments
    segmentsToExport.forEach((segment, index) => {
      // Calculate position
      const x =
        exportOrientation === "horizontal"
          ? startX + index * segmentWidth
          : startX;
      const y =
        exportOrientation === "horizontal"
          ? startY
          : startY + index * segmentHeight;

      // Draw segment
      ctx.fillStyle = segment.color;
      ctx.fillRect(x, y, segmentWidth, segmentHeight);

      // Add title if enabled
      if (exportShowTitles) {
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = getContrastTextColor(segment.color);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Draw title
        const titleX = x + segmentWidth / 2;
        const titleY = y + segmentHeight / 2 - 10;
        ctx.fillText(segment.title, titleX, titleY);

        // Draw color code
        ctx.font = "12px Arial";
        const codeX = x + segmentWidth / 2;
        const codeY = y + segmentHeight / 2 + 10;
        ctx.fillText(segment.color, codeX, codeY);
      }
    });

    // Convert to image and download
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${activeSet.name.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = dataUrl;
    link.click();

    setShowExportDialog(false);

    toast({
      title: "Export successful",
      description: "Your color segments have been exported as an image.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <AppIcon className="w-8 h-8" />
          Color Palette Generator
        </h1>
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-6">
        {/* Set Selection Tabs */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Color Palettes</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingSetId(null);
                  setNewSetName("");
                  setShowSetDialog(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Set
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {sets.map((set) => (
                <div
                  key={set.id}
                  className={`relative group border rounded-md px-3 py-2 cursor-pointer ${
                    set.id === activeSetId
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setActiveSetId(set.id)}
                >
                  <span className="font-medium">{set.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({set.segments.length})
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => openEditSetDialog(set.id)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => deleteSet(set.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Color Input Form */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium text-primary">
              Create New Segment
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-4">
              <div
                className="w-full rounded-md overflow-hidden border relative"
                style={{ backgroundColor: newColor }}
              >
                <div className="h-32 p-4 flex flex-col justify-center">
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Enter segment title"
                    className="bg-transparent border-0 text-lg font-bold placeholder:opacity-70 focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={{ color: "#ffffff" }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="#000000"
                    className="bg-transparent border-0 text-sm placeholder:opacity-70 focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={{ color: textColor }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/20 hover:bg-background/40"
                  onClick={openColorPicker}
                >
                  <Palette className="h-4 w-4" />
                </Button>
              </div>

              <Input
                id="color-picker"
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="hidden"
              />

              <div className="flex gap-2">
                <Button onClick={addOrUpdateSegment} className="flex-1">
                  {editingId ? (
                    <>Update</>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Segment
                    </>
                  )}
                </Button>

                {editingId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setNewColor("#6E56CF");
                      setNewTitle("");
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Segments Display */}
        {segments.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-primary">
                Color Segments
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={selectionMode ? "default" : "outline"}
                  size="sm"
                  onClick={toggleSelectionMode}
                >
                  {selectionMode ? "Cancel Selection" : "Select Multiple"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExportDialog(true)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>

            {selectionMode && selectedSegments.length > 0 && (
              <div className="px-6 py-2 bg-muted/20 border-y flex items-center justify-between">
                <div className="text-sm">
                  {selectedSegments.length}{" "}
                  {selectedSegments.length === 1 ? "segment" : "segments"}{" "}
                  selected
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={selectAll}>
                    Select All
                  </Button>
                  <Button variant="ghost" size="sm" onClick={deselectAll}>
                    Deselect All
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={deleteSelected}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            )}

            <CardContent className="pt-6">
              <div ref={containerRef} className="relative">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={segments.map((s) => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {segments.map((segment) => (
                      <SortableSegment
                        key={segment.id}
                        segment={segment}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        isSelected={selectedSegments.includes(segment.id)}
                        onSelect={toggleSegmentSelection}
                        selectionMode={selectionMode}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Hidden canvas for image export */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Set Dialog for creating/editing sets */}
      <Dialog open={showSetDialog} onOpenChange={setShowSetDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingSetId ? "Edit Set" : "Create New Set"}
            </DialogTitle>
            <DialogDescription>
              {editingSetId
                ? "Change the name of your color set."
                : "Create a new set to organize your color segments."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="set-name" className="text-sm font-medium">
                Set Name
              </label>
              <Input
                id="set-name"
                value={newSetName}
                onChange={(e) => setNewSetName(e.target.value)}
                placeholder="Enter a name for your set"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSetDialog(false)}>
              Cancel
            </Button>
            <Button onClick={editingSetId ? updateSetName : addNewSet}>
              {editingSetId ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export "{activeSet.name}"</DialogTitle>
            <DialogDescription>
              Configure how you want to export your color segments as an image.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="width" className="text-sm font-medium">
                  Width (px)
                </label>
                <Input
                  id="width"
                  type="number"
                  value={exportWidth}
                  onChange={(e) => setExportWidth(Number(e.target.value))}
                  min={100}
                  max={3000}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="height" className="text-sm font-medium">
                  Height (px)
                </label>
                <Input
                  id="height"
                  type="number"
                  value={exportHeight}
                  onChange={(e) => setExportHeight(Number(e.target.value))}
                  min={100}
                  max={3000}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Orientation</label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={
                    exportOrientation === "horizontal" ? "default" : "outline"
                  }
                  onClick={() => setExportOrientation("horizontal")}
                  className="flex-1"
                >
                  Horizontal
                </Button>
                <Button
                  type="button"
                  variant={
                    exportOrientation === "vertical" ? "default" : "outline"
                  }
                  onClick={() => setExportOrientation("vertical")}
                  className="flex-1"
                >
                  Vertical
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="show-titles"
                checked={exportShowTitles}
                onChange={(e) => setExportShowTitles(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="show-titles" className="text-sm font-medium">
                Show titles and color codes
              </label>
            </div>

            <div className="text-sm text-muted-foreground">
              {selectedSegments.length > 0
                ? `Exporting ${selectedSegments.length} selected segments`
                : `Exporting all ${segments.length} segments`}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowExportDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={exportAsImage}>
              <Download className="h-4 w-4 mr-2" />
              Export Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

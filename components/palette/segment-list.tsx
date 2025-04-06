import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Download, Trash2 } from 'lucide-react';
import { useRef } from 'react';

import { SegmentItem } from './segment-item';

import { Button } from '@/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { usePalette } from '@/contexts/palette-context';
import { ColorSegment } from '@/lib/types';

interface SegmentListProps {
  onExport: () => void;
  onEditSegment?: (segment: ColorSegment) => void;
}

export function SegmentList({ onExport, onEditSegment }: SegmentListProps) {
  const {
    activeSet,
    selectedSegments,
    selectionMode,
    toggleSelectionMode,
    toggleSegmentSelection,
    selectAll,
    deselectAll,
    deleteSelected,
    deleteSegment,
    reorderSegments,
  } = usePalette();

  const containerRef = useRef<HTMLDivElement>(null);

  const segments = activeSet.segments;

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

  const handleEdit = (id: string) => {
    const segment = segments.find((s) => s.id === id);
    if (segment && onEditSegment) {
      onEditSegment(segment);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = segments.findIndex((item) => item.id === active.id);
      const newIndex = segments.findIndex((item) => item.id === over.id);

      reorderSegments(oldIndex, newIndex);
    }
  };

  if (segments.length === 0) {
    return null;
  }

  return (
    <Card className="bg-palette-segment-list dark:bg-palette-segment-list-dark">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-primary dark:text-primary-dark">
          Color Segments
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant={selectionMode ? 'default' : 'outline'}
            size="sm"
            onClick={toggleSelectionMode}
            className={
              selectionMode
                ? 'w-full sm:w-auto'
                : 'w-full sm:w-auto dark:bg-primary-dark dark:text-primary-foreground-dark dark:border-primary-dark dark:hover:bg-primary-dark/90'
            }
          >
            {selectionMode ? 'Cancel Selection' : 'Select Multiple'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="w-full sm:w-auto dark:bg-primary-dark dark:text-primary-foreground-dark dark:border-primary-dark dark:hover:bg-primary-dark/90"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>

      {selectionMode && selectedSegments.length > 0 && (
        <div className="px-6 py-2 bg-palette-selection-bar dark:bg-palette-selection-bar-dark border-y border-border dark:border-border-dark flex items-center justify-between">
          <div className="text-sm">
            {selectedSegments.length} {selectedSegments.length === 1 ? 'segment' : 'segments'}{' '}
            selected
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={selectAll}>
              Select All
            </Button>
            <Button variant="ghost" size="sm" onClick={deselectAll}>
              Deselect All
            </Button>
            <Button variant="destructive" size="sm" onClick={deleteSelected}>
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
                <SegmentItem
                  key={segment.id}
                  segment={segment}
                  onEdit={handleEdit}
                  onDelete={deleteSegment}
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
  );
}

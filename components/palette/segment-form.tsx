import { Palette, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Input } from '@/components/input';
import { usePalette } from '@/contexts/palette-context';
import { ColorSegment } from '@/lib/types';

interface SegmentFormProps {
  editingSegment: ColorSegment | null;
  onCancelEdit: () => void;
}

export function SegmentForm({ editingSegment, onCancelEdit }: SegmentFormProps) {
  const { addSegment, updateSegment } = usePalette();
  const [newColor, setNewColor] = useState('#6E56CF');
  const [newTitle, setNewTitle] = useState('');

  // Set form values when editing an existing segment
  useEffect(() => {
    if (editingSegment) {
      setNewColor(editingSegment.color);
      setNewTitle(editingSegment.title);
    } else {
      setNewColor('#6E56CF');
      setNewTitle('');
    }
  }, [editingSegment]);

  const openColorPicker = () => {
    document.getElementById('color-picker')?.click();
  };

  const handleSubmit = () => {
    if (newColor && newTitle) {
      if (editingSegment) {
        // Update existing segment
        updateSegment(editingSegment.id, {
          color: newColor,
          title: newTitle,
        });
        onCancelEdit();
      } else {
        // Add new segment
        addSegment({
          color: newColor,
          title: newTitle,
        });
        setNewTitle('');
        setNewColor('#6E56CF');
      }
    }
  };

  return (
    <Card className="bg-palette-segment-form dark:bg-palette-segment-form-dark">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-primary dark:text-primary-dark">
          {editingSegment ? 'Edit Segment' : 'Create New Segment'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-4">
          <div
            className="w-full rounded-md overflow-hidden border border-border dark:border-border-dark relative"
            style={{ backgroundColor: newColor }}
          >
            <div className="h-32 p-4 flex flex-col justify-center gap-3">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter segment title"
                className="bg-slate-100 dark:bg-gray-800 border-0 text-lg font-bold placeholder:opacity-70 focus-visible:ring-0 focus-visible:ring-offset-0 w-3/4 mx-auto text-black dark:text-white"
              />
              <div className="relative w-3/4 mx-auto">
                <Input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="#000000"
                  className="bg-slate-100 dark:bg-gray-800 border-0 text-sm placeholder:opacity-70 focus-visible:ring-0 focus-visible:ring-offset-0 w-full pr-12 text-black dark:text-white"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/15 hover:bg-background/30 backdrop-blur-sm transition-colors"
                  onClick={openColorPicker}
                >
                  <Palette className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Input
            id="color-picker"
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="hidden"
          />

          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="flex-1">
              {editingSegment ? (
                <>Update Segment</>
              ) : (
                <span className="flex items-center">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Segment
                </span>
              )}
            </Button>

            {editingSegment && (
              <Button variant="outline" onClick={onCancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Palette, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Input } from '@/components/input';
import { usePalette } from '@/contexts/palette-context';
import { ColorSegment } from '@/lib/types';
import { getContrastTextColor } from '@/lib/utils';

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

  const textColor = getContrastTextColor(newColor);

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
            <div className="h-32 p-4 flex flex-col justify-center">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter segment title"
                className="bg-transparent border-0 text-lg font-bold placeholder:opacity-70 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ color: textColor }}
              />
              <Input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                placeholder="#000000"
                className="bg-transparent border-0 text-sm placeholder:opacity-70 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ color: textColor }}
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/20 hover:bg-background/40 dark:bg-background-dark/20 dark:hover:bg-background-dark/40"
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
            <Button onClick={handleSubmit} className="flex-1">
              {editingSegment ? (
                <>Update Segment</>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Segment
                </>
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

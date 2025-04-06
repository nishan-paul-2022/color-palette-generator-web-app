import { Download } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog';
import { Input } from '@/components/input';
import { usePalette } from '@/contexts/palette-context';
import { useToast } from '@/hooks/use-toast';
import { ExportOptions } from '@/lib/types';
import { getContrastTextColor } from '@/lib/utils';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportDialog({ open, onOpenChange }: ExportDialogProps) {
  const { activeSet, selectedSegments } = usePalette();
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [options, setOptions] = useState<ExportOptions>({
    width: 800,
    height: 600,
    orientation: 'horizontal',
    showTitles: true,
  });

  // Update options
  const updateOption = <K extends keyof ExportOptions>(key: K, value: ExportOptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const exportAsImage = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    canvas.width = options.width;
    canvas.height = options.height;

    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get segments to export (either selected or all)
    const segmentsToExport =
      selectedSegments.length > 0
        ? activeSet.segments.filter((seg) => selectedSegments.includes(seg.id))
        : activeSet.segments;

    if (segmentsToExport.length === 0) {
      toast({
        title: 'No segments to export',
        description: 'Please create or select segments to export.',
        variant: 'destructive',
      });
      return;
    }

    // Calculate segment dimensions
    let segmentWidth, segmentHeight, startX, startY;

    if (options.orientation === 'horizontal') {
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
      const x = options.orientation === 'horizontal' ? startX + index * segmentWidth : startX;
      const y = options.orientation === 'horizontal' ? startY : startY + index * segmentHeight;

      // Draw segment
      ctx.fillStyle = segment.color;
      ctx.fillRect(x, y, segmentWidth, segmentHeight);

      // Add title if enabled
      if (options.showTitles) {
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = getContrastTextColor(segment.color);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw title
        const titleX = x + segmentWidth / 2;
        const titleY = y + segmentHeight / 2 - 10;
        ctx.fillText(segment.title, titleX, titleY);

        // Draw color code
        ctx.font = '12px Arial';
        const codeX = x + segmentWidth / 2;
        const codeY = y + segmentHeight / 2 + 10;
        ctx.fillText(segment.color, codeX, codeY);
      }
    });

    // Convert to image and download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${activeSet.name.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = dataUrl;
    link.click();

    onOpenChange(false);

    toast({
      title: 'Export successful',
      description: 'Your color segments have been exported as an image.',
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
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
                  value={options.width}
                  onChange={(e) => updateOption('width', Number(e.target.value))}
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
                  value={options.height}
                  onChange={(e) => updateOption('height', Number(e.target.value))}
                  min={100}
                  max={3000}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Orientation</label>
              <div className="flex gap-4">
                <Button
                  htmlType="button"
                  variant={options.orientation === 'horizontal' ? 'default' : 'outline'}
                  onClick={() => updateOption('orientation', 'horizontal')}
                  className="flex-1"
                >
                  Horizontal
                </Button>
                <Button
                  htmlType="button"
                  variant={options.orientation === 'vertical' ? 'default' : 'outline'}
                  onClick={() => updateOption('orientation', 'vertical')}
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
                checked={options.showTitles}
                onChange={(e) => updateOption('showTitles', e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="show-titles" className="text-sm font-medium">
                Show titles and color codes
              </label>
            </div>

            <div className="text-sm text-muted-foreground">
              {selectedSegments.length > 0
                ? `Exporting ${selectedSegments.length} selected segments`
                : `Exporting all ${activeSet.segments.length} segments`}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={exportAsImage}>
              <Download className="h-4 w-4 mr-2" />
              Export Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hidden canvas for image export */}
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}

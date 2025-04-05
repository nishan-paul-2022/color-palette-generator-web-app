import { Button } from "@/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";
import { useToast } from "@/hooks/use-toast";
import { ColorSegment } from "@/lib/types";
import { getContrastTextColor } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Check,
  CheckSquare,
  Edit,
  GripVertical,
  Square,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface SegmentItemProps {
  segment: ColorSegment;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
  selectionMode: boolean;
}

export function SegmentItem({
  segment,
  onEdit,
  onDelete,
  isSelected,
  onSelect,
  selectionMode,
}: SegmentItemProps) {
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
      className={`w-full border border-border dark:border-border-dark rounded-md mb-3 overflow-hidden bg-palette-segment-item dark:bg-palette-segment-item-dark ${
        isSelected ? "ring-2 ring-primary dark:ring-primary-dark" : ""
      }`}
      onClick={() => selectionMode && onSelect(segment.id)}
    >
      <div className="flex items-stretch">
        {selectionMode ? (
          <div className="p-4 bg-palette-segment-item dark:bg-palette-segment-item-dark flex items-center justify-center">
            {isSelected ? (
              <CheckSquare className="h-5 w-5 text-primary dark:text-primary-dark" />
            ) : (
              <Square className="h-5 w-5 text-muted-foreground dark:text-muted-foreground-dark" />
            )}
          </div>
        ) : (
          <div
            className="p-4 cursor-grab bg-palette-segment-item dark:bg-palette-segment-item-dark"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground dark:text-muted-foreground-dark" />
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
          <div className="p-4 flex gap-2 bg-palette-segment-item dark:bg-palette-segment-item-dark">
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

import { MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/button';
import { Card, CardContent } from '@/components/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/index';
import { usePalette } from '@/contexts/palette-context';

interface SetSelectorProps {
  onCreateNewSet: () => void;
  onEditSet: (id: string) => void;
}

export function SetSelector({ onCreateNewSet, onEditSet }: SetSelectorProps) {
  const { sets, activeSetId, setActiveSet, deleteSet } = usePalette();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Color Palettes</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onCreateNewSet}
            className="dark:bg-primary-dark dark:text-primary-foreground-dark dark:border-primary-dark dark:hover:bg-primary-dark/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Set
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {sets.map((set) => (
            <div
              key={set.id}
              className={`relative group border border-border dark:border-border-dark rounded-md px-3 py-2 cursor-pointer ${
                set.id === activeSetId
                  ? 'bg-palette-box-active dark:bg-palette-box-active-dark border-primary dark:border-primary-dark'
                  : 'bg-palette-box dark:bg-palette-box-dark hover:bg-palette-segment-item-hover dark:hover:bg-palette-segment-item-hover-dark'
              }`}
              onClick={() => setActiveSet(set.id)}
            >
              <span className="font-medium">{set.name}</span>
              <span className="ml-2 text-xs text-muted-foreground dark:text-muted-foreground-dark">
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
                  <DropdownMenuItem onClick={() => onEditSet(set.id)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive dark:text-destructive-dark dark:focus:text-destructive-dark"
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
  );
}

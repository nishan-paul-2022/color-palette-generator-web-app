import { useEffect, useState } from 'react';

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

interface SetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingSetId: string | null;
}

export function SetDialog({ open, onOpenChange, editingSetId }: SetDialogProps) {
  const { sets, createSet, updateSetName } = usePalette();
  const [name, setName] = useState('');

  // Initialize form when editing set
  useEffect(() => {
    if (editingSetId) {
      const setToEdit = sets.find((set) => set.id === editingSetId);
      if (setToEdit) {
        setName(setToEdit.name);
      }
    } else {
      setName('');
    }
  }, [editingSetId, sets, open]);

  const handleSubmit = () => {
    if (name.trim()) {
      if (editingSetId) {
        updateSetName(editingSetId, name);
      } else {
        createSet(name);
      }
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editingSetId ? 'Edit Set' : 'Create New Set'}</DialogTitle>
          <DialogDescription>
            {editingSetId
              ? 'Change the name of your color set.'
              : 'Create a new set to organize your color segments.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="set-name" className="text-sm font-medium">
              Set Name
            </label>
            <Input
              id="set-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a name for your set"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{editingSetId ? 'Update' : 'Create'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

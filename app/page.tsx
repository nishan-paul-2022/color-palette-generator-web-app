'use client';

import { useEffect, useRef, useState } from 'react';

import { ClientOnly } from '@/components/client-only';
import {
  ExportDialog,
  SegmentForm,
  SegmentList,
  SetDialog,
  SetSelector,
} from '@/components/palette';
import { ThemeToggle } from '@/components/theme-toggle';
import { ColorSegment } from '@/lib/types';
import AppIcon from '@/public/icon.svg';

export default function ColorSegmentGenerator() {
  // UI state
  const [showSetDialog, setShowSetDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [editingSetId, setEditingSetId] = useState<string | null>(null);
  const [editingSegment, setEditingSegment] = useState<ColorSegment | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Set hydrated flag on client
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Handle set dialog
  const handleCreateNewSet = () => {
    setEditingSetId(null);
    setShowSetDialog(true);
  };

  const handleEditSet = (id: string) => {
    setEditingSetId(id);
    setShowSetDialog(true);
  };

  // Add event listener for segment edit events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleSegmentEditEvent = (event: Event) => {
      if (event instanceof CustomEvent) {
        setEditingSegment((event as CustomEvent<{ segment: ColorSegment }>).detail.segment);
      }
    };

    container.addEventListener('segment-edit', handleSegmentEditEvent);

    return () => {
      container.removeEventListener('segment-edit', handleSegmentEditEvent);
    };
  }, []);

  // Main app content - will only render on client to avoid hydration mismatches
  const AppContent = () => (
    <div
      className="container mx-auto py-8 px-4 min-h-screen bg-background dark:bg-background-dark"
      ref={containerRef}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-foreground dark:text-foreground-dark">
          <AppIcon className="w-8 h-8" />
          Color Palette Generator
        </h1>
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-6">
        {/* Set Selection */}
        <SetSelector onCreateNewSet={handleCreateNewSet} onEditSet={handleEditSet} />

        {/* Color Input Form */}
        <SegmentForm editingSegment={editingSegment} onCancelEdit={() => setEditingSegment(null)} />

        {/* Segments Display */}
        <SegmentList onExport={() => setShowExportDialog(true)} />
      </div>

      {/* Dialogs */}
      <SetDialog open={showSetDialog} onOpenChange={setShowSetDialog} editingSetId={editingSetId} />

      <ExportDialog open={showExportDialog} onOpenChange={setShowExportDialog} />
    </div>
  );

  // Simple loading state for server-side rendering
  return (
    <ClientOnly fallback={<div className="p-8">Loading color palette generator...</div>}>
      {isHydrated && <AppContent />}
    </ClientOnly>
  );
}

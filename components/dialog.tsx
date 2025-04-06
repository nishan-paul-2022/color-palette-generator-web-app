'use client';

import { Modal } from 'antd';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

// Create a context to manage the dialog state
const DialogContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
});

// Root component that provides state
const Dialog = ({
  children,
  open: controlledOpen,
  onOpenChange,
}: React.PropsWithChildren<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  // Determine if this is controlled or uncontrolled
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      // For uncontrolled mode
      if (!isControlled) {
        setUncontrolledOpen(value);
      }

      // For controlled mode, call the provided handler
      if (onOpenChange) {
        const newValue = typeof value === 'function' ? value(open) : value;
        onOpenChange(newValue);
      }
    },
    [isControlled, onOpenChange, open]
  );

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
};

// Trigger to open the dialog
const DialogTrigger = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { setOpen } = React.useContext(DialogContext);

  return (
    <button type="button" onClick={() => setOpen(true)} {...props}>
      {children}
    </button>
  );
};

// Simple wrapper for the DialogContext.Consumer
const DialogPortal = ({ children }: React.PropsWithChildren) => children;

// Close button/component
const DialogClose = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { setOpen } = React.useContext(DialogContext);

  return (
    <button type="button" onClick={() => setOpen(false)} {...props}>
      {children}
    </button>
  );
};

// We don't need the overlay component since Modal handles this
const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('fixed inset-0 z-50 bg-black/80', className)} {...props} />
  )
);
DialogOverlay.displayName = 'DialogOverlay';

// Main content component
const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    closeButton?: boolean;
  }
>(({ className, children, closeButton = true, ...props }, ref) => {
  const { open, setOpen } = React.useContext(DialogContext);

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      closeIcon={null}
      centered
      className={cn('w-full max-w-lg', className)}
      {...props}
    >
      <div ref={ref} className="relative">
        {children}
        {closeButton && (
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring dark:focus:ring-ring-dark focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </Modal>
  );
});
DialogContent.displayName = 'DialogContent';

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 bg-palette-dialog-header dark:bg-palette-dialog-header-dark rounded-t-lg py-4 px-6 -mx-6 -mt-6 mb-4 border-b border-border dark:border-border-dark',
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground dark:text-muted-foreground-dark', className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

'use client';

import { Tooltip as AntTooltip } from 'antd';
import * as React from 'react';

import { cn } from '@/lib/utils';

const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipProps {
  children: React.ReactNode;
  content?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}) => {
  return (
    <AntTooltip
      title={content}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      classNames={{
        root: cn(
          'rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md'
        ),
      }}
      {...props}
    >
      {children}
    </AntTooltip>
  );
};

// Extended interface to handle Radix UI's asChild prop
interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

// For backward compatibility with Radix UI API
const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ asChild, ...props }, ref) => <div ref={ref} {...props} />
);
TooltipTrigger.displayName = 'TooltipTrigger';

// For backward compatibility with Radix UI API
const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
        className
      )}
      {...props}
    />
  )
);
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

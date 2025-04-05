import { cn } from '@/lib/utils';

/**
 * Styles for the SubTrigger component
 */
export const getSubTriggerStyles = (className?: string, inset?: boolean) =>
  cn(
    'flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    inset && 'pl-8',
    className
  );

/**
 * Styles for the SubContent component
 */
export const getSubContentStyles = (className?: string) =>
  cn(
    'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    className
  );

/**
 * Styles for the Content component
 */
export const getContentStyles = (className?: string) =>
  cn(
    'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    className
  );

/**
 * Styles for the Item component
 */
export const getItemStyles = (className?: string, inset?: boolean) =>
  cn(
    'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    inset && 'pl-8',
    className
  );

/**
 * Styles for the CheckboxItem and RadioItem components
 */
export const getSelectionItemStyles = (className?: string) =>
  cn(
    'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    className
  );

/**
 * Styles for the Label component
 */
export const getLabelStyles = (className?: string, inset?: boolean) =>
  cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className);

/**
 * Styles for the Separator component
 */
export const getSeparatorStyles = (className?: string) => cn('-mx-1 my-1 h-px bg-muted', className);

/**
 * Styles for the Shortcut component
 */
export const getShortcutStyles = (className?: string) =>
  cn('ml-auto text-xs tracking-widest opacity-60', className);

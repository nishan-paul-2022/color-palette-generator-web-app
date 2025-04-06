import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

/**
 * Base type for components that can have an inset property
 */
export interface InsetProps {
  inset?: boolean;
}

/**
 * Types for the SubTrigger component
 */
export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> &
  InsetProps;

/**
 * Types for the Item component
 */
export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> &
  InsetProps;

/**
 * Types for the Label component
 */
export type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
> &
  InsetProps;

/**
 * Types for the Content component
 */
export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;

/**
 * Types for the SubContent component
 */
export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
>;

/**
 * Types for the Separator component
 */
export type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>;

/**
 * Types for the CheckboxItem component
 */
export type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

/**
 * Types for the RadioItem component
 */
export type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
>;

/**
 * Types for the Shortcut component
 */
export type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

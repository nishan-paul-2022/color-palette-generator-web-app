'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

import { getSeparatorStyles } from './styles';
import { DropdownMenuSeparatorProps } from './types';

/**
 * DropdownMenuSeparator component
 * A visual separator between menu items.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#separator
 */
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={getSeparatorStyles(className)} {...props} />
));

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export { DropdownMenuSeparator };

'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

import { getContentStyles } from './styles';
import { DropdownMenuContentProps } from './types';

/**
 * DropdownMenuContent component
 * The component that contains the dropdown menu items.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#content
 */
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={getContentStyles(className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

export { DropdownMenuContent };

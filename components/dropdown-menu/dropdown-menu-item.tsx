"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import { getItemStyles } from "./styles";
import { DropdownMenuItemProps } from "./types";

/**
 * DropdownMenuItem component
 * A basic menu item in the dropdown.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#item
 */
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={getItemStyles(className, inset)}
    {...props}
  />
));

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export { DropdownMenuItem };

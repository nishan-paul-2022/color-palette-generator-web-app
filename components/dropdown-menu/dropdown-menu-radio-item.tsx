"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Circle } from "lucide-react";
import * as React from "react";

import { getSelectionItemStyles } from "./styles";
import { DropdownMenuRadioItemProps } from "./types";

/**
 * DropdownMenuRadioItem component
 * A radio item in the dropdown menu for a radio group.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#radioitem
 */
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={getSelectionItemStyles(className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

export { DropdownMenuRadioItem };

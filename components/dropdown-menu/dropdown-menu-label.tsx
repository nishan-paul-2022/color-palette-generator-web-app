"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import { getLabelStyles } from "./styles";
import { DropdownMenuLabelProps } from "./types";

/**
 * DropdownMenuLabel component
 * A non-interactive label used to group menu items.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#label
 */
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={getLabelStyles(className, inset)}
    {...props}
  />
));

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

export { DropdownMenuLabel };

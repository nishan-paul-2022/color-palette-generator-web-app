"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRight } from "lucide-react";
import * as React from "react";

import { getSubContentStyles, getSubTriggerStyles } from "./styles";
import {
  DropdownMenuSubContentProps,
  DropdownMenuSubTriggerProps,
} from "./types";

/**
 * DropdownMenuSub component
 * A sub menu that can be nested within a dropdown menu.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#sub
 */
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/**
 * DropdownMenuSubTrigger component
 * The button that opens a submenu.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#subtrigger
 */
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={getSubTriggerStyles(className, inset)}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));

DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

/**
 * DropdownMenuSubContent component
 * The content that appears when a submenu is open.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#subcontent
 */
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={getSubContentStyles(className)}
    {...props}
  />
));

DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

export { DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger };

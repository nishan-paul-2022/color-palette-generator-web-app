"use client";

import { getShortcutStyles } from "./styles";
import { DropdownMenuShortcutProps } from "./types";

/**
 * DropdownMenuShortcut component
 * A component for displaying keyboard shortcuts in a dropdown menu item.
 * This is a custom component, not from Radix UI.
 */
const DropdownMenuShortcut = ({
  className,
  ...props
}: DropdownMenuShortcutProps) => {
  return <span className={getShortcutStyles(className)} {...props} />;
};

DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export { DropdownMenuShortcut };

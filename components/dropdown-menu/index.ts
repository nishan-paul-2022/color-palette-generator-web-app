/**
 * Dropdown Menu
 * A menu component that appears when triggered by a button.
 *
 * Based on @radix-ui/react-dropdown-menu
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Item 1</DropdownMenuItem>
 *     <DropdownMenuItem>Item 2</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>Item 3</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */

export {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
} from './dropdown-menu-root';

export { DropdownMenuContent } from './dropdown-menu-content';
export { DropdownMenuItem } from './dropdown-menu-item';
export { DropdownMenuSeparator } from './dropdown-menu-separator';
export { DropdownMenuTrigger } from './dropdown-menu-trigger';

// Re-export types for consumer usage
export type * from './types';

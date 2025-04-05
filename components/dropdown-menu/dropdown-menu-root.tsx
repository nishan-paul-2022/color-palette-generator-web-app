'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

/**
 * DropdownMenu component
 * The root component of a dropdown menu.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#root
 */
const DropdownMenu = DropdownMenuPrimitive.Root;

/**
 * DropdownMenuGroup component
 * A component used to group multiple menu items.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#group
 */
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/**
 * DropdownMenuPortal component
 * A component that portals its content to the body.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#portal
 */
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

/**
 * DropdownMenuRadioGroup component
 * A component used to group multiple radio items.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#radiogroup
 */
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export { DropdownMenu, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuRadioGroup };

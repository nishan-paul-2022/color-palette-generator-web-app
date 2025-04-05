"use client";

import type { DividerProps } from "antd";
import { Divider } from "antd";
import * as React from "react";

import { cn } from "@/lib/utils";

interface SeparatorProps extends Omit<DividerProps, "orientation"> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  className?: string;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref}>
        <Divider
          type={orientation === "horizontal" ? "horizontal" : "vertical"}
          className={cn(
            "shrink-0 bg-border",
            orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
            className
          )}
          style={style}
          {...props}
        />
      </div>
    );
  }
);
Separator.displayName = "Separator";

export { Separator };

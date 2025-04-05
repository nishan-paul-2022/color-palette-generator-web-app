"use client";

import type {
  RadioGroupProps as AntRadioGroupProps,
  RadioChangeEvent,
} from "antd";
import { Radio } from "antd";
import type { CheckboxRef } from "antd/lib/checkbox";
import * as React from "react";

import { cn } from "@/lib/utils";

interface RadioGroupProps extends Omit<AntRadioGroupProps, "onChange"> {
  className?: string;
  onChange?: (value: string) => void;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, onChange, ...props }, ref) => {
    const handleChange = (e: RadioChangeEvent) => {
      onChange?.(e.target.value);
    };

    return (
      <Radio.Group
        className={cn("grid gap-2", className)}
        onChange={handleChange}
        {...props}
        ref={ref as any}
      />
    );
  }
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof Radio> {
  className?: string;
  value: string;
}

const RadioGroupItem = React.forwardRef<CheckboxRef, RadioGroupItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Radio
        ref={ref}
        className={cn(
          "text-primary disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </Radio>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };

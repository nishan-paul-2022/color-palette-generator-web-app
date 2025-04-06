import { Button as AntButton } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary-dark dark:text-primary-foreground-dark dark:hover:bg-primary-dark/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive-dark dark:text-destructive-foreground-dark dark:hover:bg-destructive-dark/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-border-dark dark:bg-background-dark dark:hover:bg-accent-dark dark:hover:text-accent-foreground-dark',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary-dark dark:text-secondary-foreground-dark dark:hover:bg-secondary-dark/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent-dark dark:hover:text-accent-foreground-dark',
        link: 'text-primary underline-offset-4 hover:underline dark:text-primary-dark',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'>,
    VariantProps<typeof buttonVariants> {
  htmlType?: 'button' | 'submit' | 'reset';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, htmlType = 'button', children, ...props }, ref) => {
    // Map our variants to Ant Design types
    const getAntType = (): 'default' | 'primary' | 'dashed' | 'text' | 'link' => {
      switch (variant) {
        case 'default':
          return 'primary';
        case 'destructive':
          return 'primary'; // With custom styles
        case 'outline':
          return 'default';
        case 'secondary':
          return 'default';
        case 'ghost':
          return 'text';
        case 'link':
          return 'link';
        default:
          return 'primary';
      }
    };

    // Map our sizes to Ant Design sizes
    const getAntSize = () => {
      switch (size) {
        case 'sm':
          return 'small';
        case 'lg':
          return 'large';
        default:
          return 'middle';
      }
    };

    return (
      <AntButton
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.Ref<HTMLButtonElement>}
        danger={variant === 'destructive'}
        size={getAntSize()}
        htmlType={htmlType}
        type={getAntType()}
        {...(props as Omit<ButtonProps, 'htmlType' | 'variant' | 'size'>)}
      >
        {children}
      </AntButton>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

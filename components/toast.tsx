'use client';

import { notification } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import type { NotificationArgsProps } from 'antd';

import { cn } from '@/lib/utils';

// Define variants similar to the original component
const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive: 'destructive border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Types for our Toast API
export interface ToastProps extends Omit<NotificationArgsProps, 'className' | 'style' | 'message'> {
  variant?: VariantProps<typeof toastVariants>['variant'];
  className?: string;
  title?: React.ReactNode;
}

export type ToastActionElement = React.ReactElement;

// Create notification instance
const [api, contextHolder] = notification.useNotification();

// Toast component functions
const Toast = {
  // Provider component that needs to be placed at the root of your app
  Provider: ({ children }: { children: React.ReactNode }) => (
    <>
      {children}
      {contextHolder}
    </>
  ),

  // Display a toast notification
  show: ({
    title,
    description,
    variant = 'default',
    duration = 4.5,
    placement = 'topRight',
    className,
    btn,
    ...props
  }: ToastProps) => {
    return api.open({
      message: title,
      description,
      duration,
      placement,
      className: cn(toastVariants({ variant }), className),
      btn,
      ...props,
    });
  },

  // Helper function for success toasts
  success: (props: ToastProps) => Toast.show({ ...props, variant: 'default' }),

  // Helper function for error/destructive toasts
  error: (props: ToastProps) => Toast.show({ ...props, variant: 'destructive' }),

  // Dismiss all toasts
  dismiss: () => api.destroy(),
};

export { Toast };

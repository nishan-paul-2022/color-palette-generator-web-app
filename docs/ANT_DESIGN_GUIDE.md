# Ant Design Integration Guide

This guide explains how to use Ant Design within our project that uses React 19, Next.js 15, Tailwind CSS, TypeScript, and Lucide icons.

## Table of Contents

1. [Introduction](#introduction)
2. [Setup Overview](#setup-overview)
3. [Using Ant Design Components](#using-ant-design-components)
4. [Integrating with Tailwind CSS](#integrating-with-tailwind-css)
5. [Theme Customization](#theme-customization)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

## Introduction

Our project integrates Ant Design, a comprehensive UI component library, alongside our existing stack. This setup allows you to:

- Use Ant Design components with proper SSR support in Next.js
- Integrate Ant Design alongside Tailwind CSS classes
- Maintain theme consistency between Ant Design and our app
- Use Lucide icons with Ant Design components

## Setup Overview

The project includes the following Ant Design integration setup:

1. **AntDesignRegistry** - Handles server-side rendering (SSR) support
2. **AntDesignProvider** - Manages theme configuration and switching
3. **useAntDesignTheme** - Custom hook for theme management
4. **Utility functions** - For combining Ant Design with Tailwind CSS

## Using Ant Design Components

### Basic Usage

```tsx
'use client';
import { Button, DatePicker, Input } from 'antd';

export function MyComponent() {
  return (
    <div>
      <Button type="primary">Click Me</Button>
      <DatePicker />
      <Input placeholder="Type something" />
    </div>
  );
}
```

### With Ant Design Icons

```tsx
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

<Button icon={<SearchOutlined />} type="primary">Search</Button>
<Input prefix={<UserOutlined />} placeholder="Username" />
```

### With Lucide Icons

```tsx
import { LucideHeart } from 'lucide-react';
import { Button } from 'antd';

<Button icon={<LucideHeart />} type="primary">Like</Button>
```

## Integrating with Tailwind CSS

### Using the cn() Utility

The `cn()` utility function allows you to merge Tailwind classes with Ant Design components:

```tsx
import { Button } from 'antd';
import { cn } from '@/lib/utils/style-utils';

<Button className={cn('hover:shadow-lg', 'rounded-full')}>Click Me</Button>
```

### Using the withAntStyle() Utility

For components that need both inline styles and classes:

```tsx
import { DatePicker } from 'antd';
import { withAntStyle } from '@/lib/utils/style-utils';

<DatePicker 
  {...withAntStyle(
    { width: '100%' }, 
    'rounded-md hover:shadow-md'
  )} 
/>
```

## Theme Customization

### Using the Theme Hook

For component-level theme customization:

```tsx
import { ConfigProvider } from 'antd';
import { useAntDesignTheme } from '@/hooks/useAntDesignTheme';

export function ThemedComponent() {
  const { themeConfig } = useAntDesignTheme({
    colorPrimary: '#1677ff',
    borderRadius: 8,
  });
  
  return (
    <ConfigProvider theme={themeConfig}>
      {/* Your components here */}
    </ConfigProvider>
  );
}
```

### Global Theme Configuration

To modify the global theme, update the `ant-design-provider.tsx` file:

```tsx
// in app/ant-design-provider.tsx
const { themeConfig } = useAntDesignTheme({
  colorPrimary: '#your-brand-color',
  borderRadius: 8,
  // other tokens
});
```

## Best Practices

1. **Client Components**: Always use Ant Design components in client components (add `'use client';` at the top)
2. **Component Naming**: Prefix custom Ant Design enhanced components with `Ant` for clarity
3. **CSS Conflicts**: Use the `cn()` utility to safely merge Tailwind classes with Ant Design styles
4. **Server-Side Rendering**: Use the established AntDesignRegistry for SSR support
5. **Performance**: Use dynamic imports for large Ant Design components that aren't needed immediately

```tsx
import dynamic from 'next/dynamic';

const AntTable = dynamic(() => import('antd').then(mod => ({ default: mod.Table })), { 
  ssr: false, 
  loading: () => <div>Loading...</div> 
});
```

## Troubleshooting

### Common Issues

1. **Hydration Errors**: Make sure all Ant Design components are within client components
2. **CSS Loading Order**: If Tailwind overrides Ant Design styles, check the import order
3. **Theme Not Applying**: Verify the component is wrapped with AntDesignProvider
4. **SSR Issues**: Ensure the component is wrapped with AntDesignRegistry

### Debugging

For theme debugging, you can use the following snippet:

```tsx
import { theme } from 'antd';

// Inside your component
const { token } = theme.useToken();
console.log('Current theme tokens:', token);
```

---

## Additional Resources

- [Ant Design Official Documentation](https://ant.design/components/overview/)
- [Next.js with Ant Design Examples](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) 
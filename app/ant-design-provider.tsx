'use client';

import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

import { useAntDesignTheme } from '@/hooks/useAntDesignTheme';

/**
 * AntDesignProvider component that provides theme configuration for Ant Design.
 * It syncs with the app theme (light/dark) and applies appropriate styles.
 */
export function AntDesignProvider({ children }: { children: ReactNode }) {
  // Use our custom hook to get theme configuration
  const { themeConfig } = useAntDesignTheme({
    // Customize theme tokens here as needed
    colorPrimary: '#1677ff',
    // These will be merged with defaults from the hook
  });

  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}

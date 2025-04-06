'use client';

import { theme as antTheme } from 'antd';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

// Define types for theme configuration
type ThemeToken = {
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  colorInfo: string;
  borderRadius: number;
  fontFamily: string;
  // Add more token properties as needed
};

// Define the type for theme algorithms
type ThemeAlgorithm = typeof antTheme.defaultAlgorithm | typeof antTheme.darkAlgorithm;

type AntDesignThemeConfig = {
  token: Partial<ThemeToken>;
  algorithm?: ThemeAlgorithm | ThemeAlgorithm[];
};

/**
 * Custom hook to manage Ant Design theme based on your app's theme context
 *
 * @param customTokens - Optional custom tokens to override defaults
 * @returns An object containing theme config for Ant Design and theme utilities
 */
export function useAntDesignTheme(customTokens: Partial<ThemeToken> = {}) {
  const { theme, systemTheme } = useTheme();
  const { defaultAlgorithm, darkAlgorithm } = antTheme;

  // Determine if dark mode is enabled
  const isDarkMode = useMemo(() => {
    if (theme === 'system') {
      return systemTheme === 'dark';
    }
    return theme === 'dark';
  }, [theme, systemTheme]);

  // Base theme configuration
  const baseTokens: Partial<ThemeToken> = {
    colorPrimary: '#1677ff',
    borderRadius: 6,
    fontFamily: 'inherit',
    ...customTokens,
  };

  // Create theme config based on current theme
  const themeConfig: AntDesignThemeConfig = useMemo(() => {
    return {
      token: baseTokens,
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    };
  }, [isDarkMode, baseTokens]);

  return {
    themeConfig,
    isDarkMode,
    currentTheme: theme,
  };
}

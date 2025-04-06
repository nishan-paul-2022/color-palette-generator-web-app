'use client';

import { ReactNode } from 'react';

import { AntDesignProvider } from './ant-design-provider';

import { ThemeProvider } from '@/app/theme-provider';
import { PaletteProvider } from '@/contexts/palette-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AntDesignProvider>
        <PaletteProvider>{children}</PaletteProvider>
      </AntDesignProvider>
    </ThemeProvider>
  );
}

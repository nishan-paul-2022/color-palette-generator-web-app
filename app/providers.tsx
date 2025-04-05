'use client';

import { ReactNode } from 'react';

import { ThemeProvider } from '@/app/theme-provider';
import { PaletteProvider } from '@/contexts/palette-context';
import { AntDesignProvider } from './ant-design-provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AntDesignProvider>
        <PaletteProvider>{children}</PaletteProvider>
      </AntDesignProvider>
    </ThemeProvider>
  );
}

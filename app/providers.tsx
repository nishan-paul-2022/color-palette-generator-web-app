"use client";

import { ThemeProvider } from "@/app/theme-provider";
import { PaletteProvider } from "@/contexts/palette-context";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PaletteProvider>{children}</PaletteProvider>
    </ThemeProvider>
  );
}

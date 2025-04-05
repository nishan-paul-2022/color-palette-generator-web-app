import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Color Palette Generator",
  description: "Create and manage color palettes",
  generator: "v0.dev",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

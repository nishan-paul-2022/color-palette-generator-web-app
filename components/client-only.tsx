'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ClientOnly component ensures children are only rendered on the client side
 * This prevents hydration errors for components that generate dynamic content
 * like random IDs or use browser-specific APIs
 *
 * @param children - Components to render on client-side only
 * @param fallback - Optional content to show during server-side rendering
 */
export function ClientOnly({ children, fallback }: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return fallback || null;
  }

  return <>{children}</>;
}

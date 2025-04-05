'use client';

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';

/**
 * This component is necessary for Ant Design's CSS-in-JS to work correctly with Server Components.
 * It ensures styles are properly extracted and inserted during server rendering.
 */
export function AntDesignRegistry({ children }: { children: React.ReactNode }) {
  const cache = React.useMemo(() => createCache(), []);
  
  useServerInsertedHTML(() => {
    return (
      <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
    );
  });
  
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
} 
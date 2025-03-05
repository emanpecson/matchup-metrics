'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import SafeIcon, { SafeIconProps } from '../SafeIcon';

export function ThemeToggle(props: any) {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      className="w-full h-full flex justify-center place-items-center"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? <SafeIcon {...props} Icon={SunIcon} /> : <SafeIcon {...props} Icon={MoonIcon} />}
    </button>
  );
}

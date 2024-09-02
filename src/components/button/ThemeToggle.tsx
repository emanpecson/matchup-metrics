'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import SafeIcon from '../SafeIcon';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      className="w-full h-full flex justify-center place-items-center"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? <SafeIcon Icon={SunIcon} /> : <SafeIcon Icon={MoonIcon} />}
    </button>
  );
}

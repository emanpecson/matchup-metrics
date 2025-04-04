'use client';

import { routes } from '@/data/routes';
import { ThemeToggle } from './button/ThemeToggle';
import Link from 'next/link';
import { AppRoute } from '@/types/AppRoute';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-neutral-800 w-16 py-8 fixed">
      {/* routes */}
      <div className="flex flex-col place-items-center space-y-6">
        {routes.map((route: AppRoute, i: number) => {
          const isActive = pathname === route.path;
          return (
            <div className="relative w-full" key={i}>
              {isActive && <div className="bg-white h-full w-1 rounded-r-3xl absolute left-0" />}
              <Link
                href={route.path}
                className={cn(isActive && 'font-medium', 'hover:font-medium')}
                rel={route.external ? 'noopener noreferrer' : undefined}
                target={route.external ? '_blank' : undefined}
              >
                <div className="w-full flex justify-center">
                  <div className={cn(isActive && 'bg-neutral-700', 'p-2 rounded-lg w-fit')}>
                    <route.Icon
                      className={cn(
                        isActive ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors duration-150'
                      )}
                    />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}

        <div className="p-2">
          <ThemeToggle className="text-neutral-400 hover:text-white transition-colors duration-150" />
        </div>
      </div>
    </div>
  );
}

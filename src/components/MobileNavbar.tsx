'use client';

import { routes } from '@/data/routes';
import { ThemeToggle } from './button/ThemeToggle';
import Link from 'next/link';
import { AppRoute } from '@/types/AppRoute';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';
import { MenuIcon } from 'lucide-react';

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-neutral-800 h-10 px-4 flex justify-between">
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="text-neutral-400 hover:text-white transition-colors duration-150" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-neutral-800 space-y-4">
          <SheetTitle className="text-white">NBA Project</SheetTitle>

          <div className="w-full">
            {routes.map((route: AppRoute, i: number) => {
              const isActive = pathname === route.path;
              return (
                <Link href={route.path} className={cn(isActive && 'font-medium', 'hover:font-medium w-full')} key={i}>
                  <div
                    className={cn(
                      isActive
                        ? 'bg-neutral-700 text-white'
                        : 'text-neutral-400 hover:text-white transition-colors duration-150',
                      'py-2 px-4 rounded-lg flex space-x-2 w-full'
                    )}
                  >
                    <route.Icon />
                    <span>{route.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      <div>
        <ThemeToggle className="text-neutral-400 hover:text-white transition-colors duration-150" />
      </div>
    </div>
  );
}

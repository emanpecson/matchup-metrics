'use client';

import { routes } from '@/data/routes';
import { ThemeToggle } from './button/ThemeToggle';
import Link from 'next/link';
import { AppRoute } from '@/types/AppRoute';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="w-full absolute top-0 border-b flex justify-center bg-neutral-100">
      <div className="w-full flex h-16 justify-between place-items-center px-10 max-w-[100rem]">
        <div className="flex space-x-24">
          {/* app title */}
          <h1 className="text-xl font-extrabold text-nowrap">{process.env.APP_TITLE ?? 'NBA Project'}</h1>

          {/* routes */}
          <div className="space-x-4 w-full flex place-items-center">
            {routes.map((route: AppRoute) => {
              const isActive = pathname === route.path;
              return (
                <Link href={route.path} className={cn(isActive && 'font-medium', 'hover:font-medium')}>
                  {route.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* buttons */}
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

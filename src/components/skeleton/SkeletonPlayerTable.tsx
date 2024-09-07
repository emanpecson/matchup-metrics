import { cn } from '@/lib/utils';
import { playerTableColumns } from '../player/PlayerTable';
import { Skeleton } from '../ui/skeleton';

export default function SkeletonPlayerTable({ rowCount }: { rowCount: number }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="sm:text-sm text-xs uppercase text-neutral-500">
          {playerTableColumns.map((col: string, i: number) => {
            const isFirst = i === 0;
            const isLast = i === playerTableColumns.length - 1;
            return (
              <th className={cn(isFirst ? 'text-left' : isLast ? 'text-right' : 'text-center', 'px-4 pb-2')}>{col}</th>
            );
          })}
        </tr>
      </thead>
      <tbody className="divide-y">
        {new Array(rowCount).fill(0).map((_, i: number) => (
          <tr key={i} className="sm:text-base text-sm text-neutral-600 dark:text-neutral-200">
            <td className="h-[39px]">
              <div className={cn('flex space-x-1 place-items-center justify-center')}>
                <Skeleton className="rounded-full w-6 h-6" />
                <Skeleton className="w-[12rem] mx-2 h-4" />
              </div>
            </td>
            <td className="h-[39px]">
              <div className={cn('flex place-items-center justify-center')}>
                <Skeleton className="w-1/2 mx-2 h-4" />
              </div>
            </td>
            <td className="h-[39px]">
              <div className={cn('flex place-items-center justify-center')}>
                <Skeleton className="w-2/3 mx-2 h-4" />
              </div>
            </td>
            <td className="h-[39px]">
              <div className={cn('flex place-items-center justify-center')}>
                <Skeleton className="w-2/3 mx-2 h-4" />
              </div>
            </td>
            <td className="h-[39px]">
              <div className={cn('flex place-items-center justify-center')}>
                <Skeleton className="w-2/3 mx-2 h-4" />
              </div>
            </td>
            <td className="h-[39px]">
              <div className={cn('flex place-items-center justify-center')}>
                <Skeleton className="w-2/3 mx-2 h-4" />
              </div>
            </td>
            <td className="h-[39px]">
              <div className={cn('flex place-items-center justify-center')}>
                <Skeleton className="w-2/3 mx-2 h-4" />
              </div>
            </td>
            <td className="h-[39px]">
              <div className={cn('flex place-items-center justify-center')}>
                <Skeleton className="w-1/2 mx-2 h-4" />
              </div>
            </td>
            <td className="h-[39px]">
              <div className={cn('flex space-x-1 place-items-center justify-center')}>
                <Skeleton className="rounded-full w-6 h-6" />
                <Skeleton className="w-1/2 mx-2 h-4" />
              </div>
            </td>
            <td className="h-[39px]">
              <div className={cn('flex place-items-center justify-end')}>
                <Skeleton className="w-[2.5rem] mx-2 h-4" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

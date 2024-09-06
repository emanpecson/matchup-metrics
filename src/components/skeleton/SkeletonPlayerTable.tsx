import { cn } from '@/lib/utils';
import { playerTableColumns } from '../player/PlayerTable';
import { Skeleton } from '../ui/skeleton';

export default function SkeletonPlayerTable() {
  const rowCount = 10;

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
            {playerTableColumns.map((_, j: number) => {
              const isFirst = j === 0;
              const isLast = j === playerTableColumns.length - 1;
              return (
                <td className="h-9">
                  <div className={cn('flex', isFirst ? 'justify-start' : isLast ? 'justify-end' : 'justify-center')}>
                    <Skeleton className="w-full mx-2 h-5" />
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

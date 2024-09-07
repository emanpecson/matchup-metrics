import { cn } from '@/lib/utils';
import { playerTableColumns } from '../player/PlayerTable';
import { Skeleton } from '../ui/skeleton';

export default function SkeletonPlayerTable({ rowCount }: { rowCount: number }) {
  const defaultSkeleton = (isFirst: boolean, isLast: boolean) => {
    return (
      <td className="h-[39px]">
        <div
          className={cn(
            'flex place-items-center',
            isFirst ? 'justify-start' : isLast ? 'justify-end' : 'justify-center'
          )}
        >
          <Skeleton className="w-4/5 mx-2 h-4" />
        </div>
      </td>
    );
  };

  const inlineImageSkeleton = (isFirst: boolean, isLast: boolean) => {
    return (
      <td className="h-[39px]">
        <div
          className={cn(
            'flex space-x-1.5 place-items-center',
            isFirst ? 'justify-start' : isLast ? 'justify-end' : 'justify-center'
          )}
        >
          <Skeleton className="rounded-full w-6 h-6" />
          <Skeleton className="w-2/3 mx-2 h-4" />
        </div>
      </td>
    );
  };

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
            {playerTableColumns.map((col, j: number) => {
              const isFirst = j === 0;
              const isLast = j === playerTableColumns.length - 1;
              // return (
              //   <td className="h-[39px]">
              //     <div className={cn('flex', isFirst ? 'justify-start' : isLast ? 'justify-end' : 'justify-center')}>
              //       <Skeleton className="w-full mx-2 h-5" />
              //     </div>
              //   </td>
              // );
              return col === 'name' || col === 'team'
                ? inlineImageSkeleton(isFirst, isLast)
                : defaultSkeleton(isFirst, isLast);
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

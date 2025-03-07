import { useWindowResize, widthBreakpoints } from '@/hooks/useWindowResize';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronUpIcon, MinusIcon } from 'lucide-react';
import { useState } from 'react';

interface StatCompareIconProps {
  thisStat: number;
  thatStat: number;
  reverse?: boolean;
}

export default function StatCompareIcon(props: StatCompareIconProps) {
  const [isMobile, setIsMobile] = useState(false);
  useWindowResize(
    widthBreakpoints.md,
    () => setIsMobile(false),
    () => setIsMobile(true)
  );

  return (
    <div
      className={cn(
        'rounded-md p-0.5 w-fit border bg-opacity-90 h-fit',
        (props.reverse === undefined && props.thisStat > props.thatStat) ||
          (props.reverse && props.thisStat < props.thatStat)
          ? 'bg-green-400 text-green-700 dark:border-green-700 border-green-500'
          : (props.reverse === undefined && props.thisStat < props.thatStat) ||
              (props.reverse && props.thisStat > props.thatStat)
            ? 'bg-red-400 text-red-700 dark:border-red-700 border-red-500'
            : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 border-neutral-300 dark:border-neutral-700'
      )}
    >
      {props.thisStat > props.thatStat ? (
        <ChevronUpIcon size={isMobile ? 8 : 12} strokeWidth={4} />
      ) : props.thisStat < props.thatStat ? (
        <ChevronDownIcon size={isMobile ? 8 : 12} strokeWidth={4} />
      ) : (
        <MinusIcon size={isMobile ? 8 : 12} strokeWidth={4} />
      )}
    </div>
  );
}

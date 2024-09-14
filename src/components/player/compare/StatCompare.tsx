import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronUpIcon, MinusIcon } from 'lucide-react';

interface StatCompareProps {
  thisStat: number;
  thatStat: number;
  reverse?: boolean;
}

export default function StatCompare(props: StatCompareProps) {
  return (
    <div
      className={cn(
        'rounded-md p-0.5 w-fit border bg-opacity-90',
        (props.reverse === undefined && props.thisStat > props.thatStat) ||
          (props.reverse && props.thisStat < props.thatStat)
          ? 'bg-green-400 text-green-700 dark:border-green-700 border-green-500'
          : (props.reverse === undefined && props.thisStat < props.thatStat) ||
              (props.reverse && props.thisStat > props.thatStat)
            ? 'bg-red-400 text-red-700 dark:border-red-700 border-red-500'
            : 'bg-yellow-400 text-yellow-700 dark:border-yellow-700 border-yellow-500'
      )}
    >
      {props.thisStat > props.thatStat ? (
        <ChevronUpIcon size={12} strokeWidth={4} />
      ) : props.thisStat < props.thatStat ? (
        <ChevronDownIcon size={12} strokeWidth={4} />
      ) : (
        <MinusIcon size={12} strokeWidth={4} />
      )}
    </div>
  );
}

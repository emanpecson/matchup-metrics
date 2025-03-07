import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '../ui/button';

export interface PaginatorProps {
  page: number;
  rowCount: number;
  onPrev: () => void;
  onNext: () => void;
  totalCount: number;
}

export default function Paginator(props: PaginatorProps) {
  const disablePrev = props.page === 0;
  const disableNext = (props.page + 1) * props.rowCount >= props.totalCount; // 1 * 12 >= 13 (false; prompt 2 pages)

  return (
    <div className="flex space-x-1">
      <div className="lg:flex hidden rounded-md border px-4 place-items-center min-w-[7rem] justify-center pointer-events-none">
        <p className="text-neutral-600 dark:text-neutral-400">{`${props.totalCount} rows`}</p>
      </div>
      <div className="lg:flex hidden rounded-md border px-4 place-items-center min-w-[9rem] justify-center pointer-events-none">
        <p className="text-neutral-600 dark:text-neutral-400">{`Page ${props.totalCount > 0 ? props.page + 1 : 0} of ${Math.ceil(props.totalCount / props.rowCount)}`}</p>
      </div>
      <Button
        size={'icon'}
        variant={'outline'}
        className="text-neutral-500"
        disabled={disablePrev}
        onClick={props.onPrev}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        size={'icon'}
        variant={'outline'}
        className="text-neutral-500"
        disabled={disableNext}
        onClick={props.onNext}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
}

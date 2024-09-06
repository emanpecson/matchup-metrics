import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';

export default function CloseButton({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-150 border text-neutral-500 hover:text-neutral-700 dark:hover:text-white',
        className
      )}
    >
      <XIcon className="p-1" />
    </button>
  );
}

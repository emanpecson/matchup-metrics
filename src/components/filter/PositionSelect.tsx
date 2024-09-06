import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { CheckIcon, XIcon } from 'lucide-react';
import positions from '@/data/positions';
import CloseButton from '../button/CloseButton';

export default function PositionSelect({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (pos: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleSelect = (currValue: string) => {
    onValueChange(currValue);
  };

  const handleReset = () => {
    onValueChange('');
  };

  return (
    <Select onOpenChange={setIsOpen} open={isOpen}>
      <div className="relative" onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <div className="absolute left-2 top-2 pointer-events-none">
          {value ? (
            <CloseButton onClick={handleReset} className="pointer-events-auto" />
          ) : (
            <PuzzlePieceIcon
              className={cn(
                'w-6 duration-150 transition-colors',
                isHovering ? 'dark:text-white text-neutral-900' : 'text-neutral-500'
              )}
            />
          )}
        </div>
        <SelectTrigger className="min-w-48 space-x-4 font-medium hover:bg-neutral-200 dark:hover:bg-neutral-900 text-neutral-500 dark:hover:text-white hover:text-neutral-800 duration-150 transition-colors">
          <div
            className={cn(
              value ? 'dark:text-white text-neutral-800' : '',
              'flex space-x-1.5 place-items-center text-nowrap'
            )}
          >
            <label className="cursor-pointer pl-7">
              {value ? positions[value as keyof typeof positions] : 'Filter Position'}
            </label>
          </div>
        </SelectTrigger>
      </div>

      <SelectContent>
        {Object.entries(positions).map((entry, i) => {
          // <SelectItem value={entry[0]} isSelected={entry[0] === value} key={i} className="cursor-pointer">
          //   {entry[1]}
          // </SelectItem>
          const isSelected = entry[0] === value;

          return (
            <button
              key={i}
              onClick={() => {
                onValueChange(isSelected ? '' : entry[0]);
                setIsOpen(false);
              }}
              className="flex h-10 w-full items-center rounded-md bg-background px-3 text-sm dark:hover:bg-neutral-800 hover:bg-neutral-100"
            >
              {isSelected && <CheckIcon size={16} />}
              <p className={cn(isSelected ? 'pl-[10px]' : 'pl-[26px]')}>{entry[1]}</p>
            </button>
          );
        })}
      </SelectContent>
    </Select>
  );
}

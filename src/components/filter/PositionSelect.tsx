import { useState } from 'react';
import { Select, SelectContent, SelectTrigger } from '../ui/select';
import { cn } from '@/lib/utils';
import { CheckIcon, ShieldIcon } from 'lucide-react';
import positions from '@/data/positions';
import CloseButton from '../button/CloseButton';
import { useWindowResize, widthBreakpoints } from '@/hooks/useWindowResize';
import { Button } from '../ui/button';
import { reformatPosition } from '@/utils/reformatString';

interface PositionSelectProps {
  value: string;
  onValueChange: (pos: string) => void;
}

export default function PositionSelect(props: PositionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useWindowResize(
    widthBreakpoints.lg,
    () => setIsMobile(false),
    () => setIsMobile(true)
  );

  const handleReset = () => {
    props.onValueChange('');
  };

  return (
    <Select onOpenChange={setIsOpen} open={isOpen}>
      <div className="relative" onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        {!isMobile && (
          <div className="absolute left-3 top-2.5 pointer-events-none">
            {props.value ? (
              <CloseButton onClick={handleReset} className="pointer-events-auto" />
            ) : (
              <ShieldIcon
                size={20}
                strokeWidth={2.5}
                className={cn(
                  'duration-150 transition-colors',
                  isHovering ? 'dark:text-white text-neutral-900' : 'text-neutral-500'
                )}
              />
            )}
          </div>
        )}

        <SelectTrigger className="lg:min-w-48 w-fit space-x-4 font-medium hover:bg-neutral-200 dark:hover:bg-neutral-900 text-neutral-500 dark:hover:text-white hover:text-neutral-800 duration-150 transition-colors">
          {isMobile ? (
            <div>
              {props.value ? (
                <div className="font-semibold">{reformatPosition(props.value as keyof typeof positions)}</div>
              ) : (
                <ShieldIcon />
              )}
            </div>
          ) : (
            <div
              className={cn(
                props.value ? 'dark:text-white text-neutral-800' : '',
                'flex space-x-1.5 place-items-center text-nowrap'
              )}
            >
              <label className="cursor-pointer pl-7">
                {props.value ? positions[props.value as keyof typeof positions] : 'Filter Position'}
              </label>
            </div>
          )}
        </SelectTrigger>
      </div>

      <SelectContent>
        {Object.entries(positions).map((entry, i) => {
          const isSelected = entry[0] === props.value;

          return (
            <button
              key={i}
              onClick={() => {
                props.onValueChange(isSelected ? '' : entry[0]);
                setIsOpen(false);
              }}
              className="flex h-10 w-full items-center rounded-md bg-background px-3 text-sm dark:hover:bg-neutral-800 hover:bg-neutral-100"
            >
              {isSelected && <CheckIcon size={16} />}
              <p
                className={cn(
                  isSelected
                    ? 'pl-[10px] font-semibold dark:text-white'
                    : 'pl-[26px] dark:text-neutral-400 text-neutral-600'
                )}
              >
                {entry[1]}
              </p>
            </button>
          );
        })}
      </SelectContent>
    </Select>
  );
}

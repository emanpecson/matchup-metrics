import { cn } from '@/lib/utils';
import { ArrowLeftRightIcon, BanIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { LineupSlotState } from './LineupSlot';

interface ActionPromptProps {
  state: LineupSlotState;
  isHovering: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function ActionPrompt(props: ActionPromptProps) {
  return (
    <div>
      {props.state === LineupSlotState.ADD ||
      props.state === LineupSlotState.REMOVE ||
      props.state === LineupSlotState.SWAP ? (
        <div
          className={cn(
            props.isHovering ? 'opacity-100 scale-125' : 'opacity-0 scale-100',
            props.size === 'md' ? 'top-8 left-10' : props.size === 'lg' ? 'top-[4rem] left-[5rem]' : 'top-4 left-6',
            'rounded-full bg-neutral-100 dark:bg-neutral-900 p-3 absolute duration-200 transition-all shadow-lg'
          )}
        >
          {props.state === LineupSlotState.ADD ? (
            <PlusIcon className="text-neutral-500" />
          ) : props.state === LineupSlotState.REMOVE ? (
            <MinusIcon className="text-neutral-500" />
          ) : (
            <ArrowLeftRightIcon className="text-neutral-500" />
          )}
        </div>
      ) : (
        props.state === LineupSlotState.DISABLE && (
          <div
            className={cn(
              'absolute p-1 bg-red-400 opacity-70 rounded-full',
              props.size === 'md' ? 'top-5 left-7' : props.size === 'lg' ? 'top-[3rem] left-[4rem]' : 'top-3 left-5'
            )}
          >
            <BanIcon size={props.size === 'md' ? 64 : props.size === 'lg' ? 80 : 48} className="text-red-800" />
          </div>
        )
      )}
    </div>
  );
}

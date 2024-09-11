import { cn } from '@/lib/utils';
import { RosterSlotState } from './RosterSlot';
import { ArrowLeftRightIcon, BanIcon, MinusIcon, PlusIcon } from 'lucide-react';

export default function ActionPrompt({ state, isHovering }: { state: RosterSlotState; isHovering: boolean }) {
  return (
    <div>
      {state === RosterSlotState.ADD || state === RosterSlotState.REMOVE || state === RosterSlotState.SWAP ? (
        <div
          className={cn(
            isHovering ? 'opacity-100 scale-125' : 'opacity-0 scale-100',
            'rounded-full bg-neutral-100 dark:bg-neutral-900 p-3 absolute top-8 left-10 duration-200 transition-all shadow-lg'
          )}
        >
          {state === RosterSlotState.ADD ? (
            <PlusIcon className="text-neutral-500" />
          ) : state === RosterSlotState.REMOVE ? (
            <MinusIcon className="text-neutral-500" />
          ) : (
            <ArrowLeftRightIcon className="text-neutral-500" />
          )}
        </div>
      ) : (
        state === RosterSlotState.DISABLE && (
          <div className="absolute top-5 left-7 p-1 bg-red-400 opacity-70 rounded-full">
            <BanIcon size={64} className="text-red-800" />
          </div>
        )
      )}
    </div>
  );
}

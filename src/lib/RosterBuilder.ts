import positions from '@/data/positions';
import { PlayerIncludeRegularStats } from '../types/response/player/PlayerIncludeRegularStats';

export interface RosterBuilderSlot {
  player: PlayerIncludeRegularStats | null;
  rosterPosition: keyof typeof positions;
  id: number;
}

export class RosterBuilder {
  private guard1: RosterBuilderSlot;
  private guard2: RosterBuilderSlot;
  private forward1: RosterBuilderSlot;
  private forward2: RosterBuilderSlot;
  private center: RosterBuilderSlot;

  constructor(roster?: RosterBuilder) {
    this.guard1 = roster?.guard1 ?? { player: null, rosterPosition: 'G', id: 1 };
    this.guard2 = roster?.guard2 ?? { player: null, rosterPosition: 'G', id: 2 };
    this.forward1 = roster?.forward1 ?? { player: null, rosterPosition: 'F', id: 3 };
    this.forward2 = roster?.forward2 ?? { player: null, rosterPosition: 'F', id: 4 };
    this.center = roster?.center ?? { player: null, rosterPosition: 'C', id: 5 };
  }

  public getRoster = (): RosterBuilderSlot[] => {
    return [this.guard1, this.guard2, this.forward1, this.forward2, this.center];
  };

  public printRoster = (): void => {
    for (const slot of this.getRoster()) {
      const prefix = `[${slot.id}][${slot.rosterPosition}]:`;
      console.log(`${prefix} ${slot.player ? slot.player.name : 'Empty'}`);
    }
  };

  public updateBySlotId = (slotId: number, player: PlayerIncludeRegularStats | null): RosterBuilder => {
    for (const slot of this.getRoster()) {
      if (slot.id === slotId) {
        slot.player = player;
        return this;
      }
    }
    return this;
  };

  public isFull = (): boolean => {
    if (!this.guard1.player) return false;
    if (!this.guard2.player) return false;
    if (!this.forward1.player) return false;
    if (!this.forward2.player) return false;
    if (!this.center.player) return false;
    return true;
  };

  public remainingSlots = (): RosterBuilderSlot[] => {
    const slots: RosterBuilderSlot[] = [];
    for (const slot of this.getRoster()) {
      if (!slot.player) slots.push(slot);
    }
    return slots;
  };
}

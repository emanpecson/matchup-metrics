import positions from '@/data/positions';
import { Player } from '@prisma/client';

export interface RosterBuilderSlot {
  player: Player | null;
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

  public getRoster = () => {
    return [this.guard1, this.guard2, this.forward1, this.forward2, this.center];
  };

  public updateBySlotId = (slotId: number, player: Player | null) => {
    for (const slot of this.getRoster()) {
      if (slot.id === slotId) {
        slot.player = player;
        return this;
      }
    }
    return this;
  };
}

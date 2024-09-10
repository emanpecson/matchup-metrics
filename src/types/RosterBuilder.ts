import positions from '@/data/positions';
import { Player } from '@prisma/client';

export interface RosterSlot {
  player: Player | null;
  rosterPosition: keyof typeof positions;
  id: number;
}

export class RosterBuilder {
  public guard1: RosterSlot;
  public guard2: RosterSlot;
  public forward1: RosterSlot;
  public forward2: RosterSlot;
  public center: RosterSlot;

  constructor() {
    this.guard1 = { player: null, rosterPosition: 'G', id: 1 };
    this.guard2 = { player: null, rosterPosition: 'G', id: 2 };
    this.forward1 = { player: null, rosterPosition: 'F', id: 3 };
    this.forward2 = { player: null, rosterPosition: 'F', id: 4 };
    this.center = { player: null, rosterPosition: 'C', id: 5 };
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

'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { InfoIcon } from 'lucide-react';
import { Button } from './ui/button';

export default function Disclaimer() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex place-items-center gap-1.5">
            <InfoIcon size={20} strokeWidth={2.5} />
            <h1 className="font-medium">Disclaimer</h1>
          </DialogTitle>
          <DialogDescription>
            {process.env.NEXT_PUBLIC_APP_TITLE} is an independent project and is not affiliated with, endorsed by, or
            associated with the National Basketball Association (NBA), its teams, or any other professional basketball
            league. All player names, statistics, and lineup data presented are for informational and educational
            purposes only. All trademarks, logos, and images are the property of their respective owners.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Okay</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

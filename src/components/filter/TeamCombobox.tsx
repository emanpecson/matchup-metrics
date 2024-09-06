'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import teams, { TeamInfo } from '@/data/teams';
import CloseButton from '../button/CloseButton';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export function TeamCombobox({ onValueChange }: { onValueChange: (teamAbbreviation: string) => void }) {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<{ name: keyof typeof teams; info: TeamInfo } | null>();
  const [isHovering, setIsHovering] = useState(false);

  const handleReset = () => {
    setSelectedTeam(null);
    onValueChange('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative" onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <div className="absolute left-2 top-2 pointer-events-none">
          {selectedTeam ? (
            <CloseButton onClick={handleReset} className="pointer-events-auto" />
          ) : (
            <UserGroupIcon
              className={cn(
                'w-6 duration-150 transition-colors',
                isHovering ? 'dark:text-white text-neutral-900' : 'text-neutral-500'
              )}
            />
          )}
        </div>

        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="min-w-[18rem] text-neutral-500">
            <div className="flex w-full place-items-center pl-7">
              {selectedTeam ? (
                <p className="dark:text-white text-neutral-800">{`${selectedTeam.info.city} ${selectedTeam.info.name} (${selectedTeam.info.abbreviation})`}</p>
              ) : (
                <p>Filter Team</p>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[18rem] p-0">
        <Command>
          <CommandInput placeholder="Filter team..." />
          <CommandList>
            <CommandEmpty>Team not found.</CommandEmpty>
            <CommandGroup>
              {Object.entries(teams).map((entry, i) => {
                const thisTeam = entry[1];
                const displayName = `${thisTeam.city} ${thisTeam.name} (${thisTeam.abbreviation})`;

                return (
                  <CommandItem
                    key={i}
                    value={displayName}
                    onSelect={() => {
                      if (thisTeam.abbreviation === selectedTeam?.info.abbreviation) {
                        onValueChange('');
                        setSelectedTeam(null);
                      } else {
                        onValueChange(thisTeam.abbreviation);
                        setSelectedTeam({ name: thisTeam.name as keyof typeof teams, info: thisTeam });
                      }
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedTeam?.info.abbreviation === thisTeam.abbreviation ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <p>{displayName}</p>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

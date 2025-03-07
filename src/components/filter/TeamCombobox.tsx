'use client';

import { Check, ChevronsUpDown, UsersIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import teams from '@/data/teams';
import CloseButton from '../button/CloseButton';
import { getTeamLogoUrl } from '@/utils/getPhotoUrl';
import InlineImage from '../InlineImage';
import Image from 'next/image';
import { useWindowResize, widthBreakpoints } from '@/hooks/useWindowResize';

interface TeamComboboxProps {
  value: string;
  onValueChange: (teamAbbreviation: string) => void;
}

export function TeamCombobox(props: TeamComboboxProps) {
  const [open, setOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useWindowResize(
    widthBreakpoints.lg,
    () => setIsMobile(false),
    () => setIsMobile(true)
  );

  const handleReset = () => {
    props.onValueChange('');
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative" onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        {!isMobile && (
          <div className="absolute left-2 top-2 pointer-events-none">
            {props.value ? (
              <CloseButton onClick={handleReset} className="pointer-events-auto" />
            ) : (
              <UsersIcon
                size={24}
                className={cn(
                  'duration-150 transition-colors',
                  isHovering ? 'dark:text-white text-neutral-900' : 'text-neutral-500'
                )}
              />
            )}
          </div>
        )}

        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size={isMobile ? 'icon' : 'default'}
            role="combobox"
            aria-expanded={open}
            className="lg:min-w-[18rem] text-neutral-500"
          >
            {isMobile ? (
              <div>
                {props.value ? (
                  <div className="w-full">
                    <Image
                      src={getTeamLogoUrl(props.value)}
                      alt={props.value}
                      height={24}
                      width={24}
                      className="w-[26px] h-[26px] object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <UsersIcon size={24} />
                )}
              </div>
            ) : (
              <div className="flex justify-between place-items-center w-full">
                <div className="pl-7">
                  {props.value ? (
                    <InlineImage src={getTeamLogoUrl(props.value)} alt={props.value}>
                      <p className="dark:text-white text-neutral-800">{`${teams[props.value as keyof typeof teams].city} ${teams[props.value as keyof typeof teams].name} (${props.value})`}</p>
                    </InlineImage>
                  ) : (
                    <p>Filter Team</p>
                  )}
                </div>
                <ChevronsUpDown size={16} className="shrink-0 opacity-50" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[19rem] p-0">
        <Command>
          <CommandInput placeholder="Filter team..." />
          <CommandList>
            <CommandEmpty>Team not found.</CommandEmpty>
            <CommandGroup>
              {Object.entries(teams).map((entry, i) => {
                const thisTeam = entry[1];
                const displayName = `${thisTeam.city} ${thisTeam.name} (${thisTeam.abbreviation})`;
                const isSelected = props.value && props.value === thisTeam.abbreviation;

                return (
                  <CommandItem
                    key={i}
                    value={displayName}
                    onSelect={() => {
                      if (isSelected) props.onValueChange('');
                      else props.onValueChange(thisTeam.abbreviation);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                    <InlineImage src={getTeamLogoUrl(thisTeam.abbreviation)} alt={thisTeam.abbreviation}>
                      <p
                        className={cn(
                          isSelected
                            ? 'font-semibold dark:text-white text-neutral-800'
                            : 'dark:text-neutral-300 text-neutral-600'
                        )}
                      >
                        {displayName}
                      </p>
                    </InlineImage>
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

'use client';

import StatCompare from '@/components/player/compare/StatCompare';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Player } from '@prisma/client';
import React, { useState } from 'react';

interface PlayerComparePopupProps {
  children: React.ReactNode;
  thisPlayer: Player;
  thatPlayer: Player;
}

export default function PlayerComparePopup(props: PlayerComparePopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0} open={isOpen}>
        <TooltipTrigger onMouseOver={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} asChild>
          {props.children}
        </TooltipTrigger>
        <TooltipContent className="mr-12 mb-6">
          <div className="flex space-x-4">
            <table>
              <tbody>
                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-bold">FTSY</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{props.thisPlayer.fantasyPpg}</td>
                  <td>
                    <StatCompare thisStat={props.thisPlayer.fantasyPpg} thatStat={props.thatPlayer.fantasyPpg} />
                  </td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-bold">PPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{props.thisPlayer.ppg}</td>
                  <td>
                    <StatCompare thisStat={props.thisPlayer.ppg} thatStat={props.thatPlayer.ppg} />
                  </td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-bold">APG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{props.thisPlayer.apg}</td>
                  <td>
                    <StatCompare thisStat={props.thisPlayer.apg} thatStat={props.thatPlayer.apg} />
                  </td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">RPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{props.thisPlayer.rpg}</td>
                  <td>
                    <StatCompare thisStat={props.thisPlayer.rpg} thatStat={props.thatPlayer.rpg} />
                  </td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">BPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{props.thisPlayer.bpg}</td>
                  <td>
                    <StatCompare thisStat={props.thisPlayer.bpg} thatStat={props.thatPlayer.bpg} />
                  </td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">SPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{props.thisPlayer.spg}</td>
                  <td>
                    <StatCompare thisStat={props.thisPlayer.spg} thatStat={props.thatPlayer.spg} />
                  </td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">TPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{props.thisPlayer.tpg}</td>
                  <td>
                    <StatCompare thisStat={props.thisPlayer.tpg} thatStat={props.thatPlayer.tpg} reverse />
                  </td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">MPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{props.thisPlayer.mpg}</td>
                  <td>
                    <StatCompare thisStat={props.thisPlayer.mpg} thatStat={props.thatPlayer.mpg} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

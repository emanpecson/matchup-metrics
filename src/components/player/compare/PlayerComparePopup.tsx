'use client';

import StatCompare from '@/components/player/compare/StatCompare';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { yahooFantasyPpg } from '@/utils/fantasyConverter';
import React, { useState } from 'react';

interface PlayerComparePopupProps {
  children: React.ReactNode;
  thisPlayer: PlayerIncludeRegularStats;
  thatPlayer: PlayerIncludeRegularStats;
}

export default function PlayerComparePopup(props: PlayerComparePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const thisRs = props.thisPlayer.regularStats;
  const thatRs = props.thatPlayer.regularStats;

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
                  <td className="text-right text-sm pl-2 pr-0.5">{yahooFantasyPpg(thisRs)}</td>
                  <td>
                    <StatCompare
                      thisStat={yahooFantasyPpg(thisRs) as unknown as number}
                      thatStat={yahooFantasyPpg(thatRs) as unknown as number}
                    />
                  </td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-bold">PPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{thisRs.ppg.toFixed(1)}</td>
                  <td>
                    <StatCompare thisStat={thisRs.ppg} thatStat={thatRs.ppg} />
                  </td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-bold">APG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{thisRs.apg.toFixed(1)}</td>
                  <td>
                    <StatCompare thisStat={thisRs.apg} thatStat={thatRs.apg} />
                  </td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">RPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{thisRs.rpg.toFixed(1)}</td>
                  <td>
                    <StatCompare thisStat={thisRs.rpg} thatStat={thatRs.rpg} />
                  </td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">BPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{thisRs.bpg.toFixed(1)}</td>
                  <td>
                    <StatCompare thisStat={thisRs.bpg} thatStat={thatRs.bpg} />
                  </td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">SPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{thisRs.spg.toFixed(1)}</td>
                  <td>
                    <StatCompare thisStat={thisRs.spg} thatStat={thatRs.spg} />
                  </td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">TPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{thisRs.tpg.toFixed(1)}</td>
                  <td>
                    <StatCompare thisStat={thisRs.tpg} thatStat={thatRs.tpg} reverse />
                  </td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">MPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{thisRs.mpg.toFixed(1)}</td>
                  <td>
                    <StatCompare thisStat={thisRs.mpg} thatStat={thatRs.mpg} />
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

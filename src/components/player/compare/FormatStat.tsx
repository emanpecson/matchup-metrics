import { cn } from '@/lib/utils';
import StatCompareIcon from './StatCompareIcon';

export default function FormatStat(props: {
  stat?: number;
  vsStat?: number;
  justifyRight?: boolean;
  reverse?: boolean;
  showPercent?: boolean;
}) {
  return (
    <div
      className={cn(
        props.justifyRight ? 'justify-end' : 'justify-start',
        'flex space-x-1 place-items-center w-full px-2 lg:text-base md:text-sm text-xs'
      )}
    >
      {!props.justifyRight && (
        <StatCompareIcon thisStat={props.stat ?? 0} thatStat={props.vsStat ?? 0} reverse={props.reverse} />
      )}
      {props.stat ? (
        <p className="font-semibold flex">
          <span>{props.stat.toFixed(1)}</span>
          {props.showPercent && <span>%</span>}
        </p>
      ) : (
        <span className="text-neutral-500 font-semibold">N/A</span>
      )}
      {props.justifyRight && (
        <StatCompareIcon thisStat={props.stat ?? 0} thatStat={props.vsStat ?? 0} reverse={props.reverse} />
      )}
    </div>
  );
}

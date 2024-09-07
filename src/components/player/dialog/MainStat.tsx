import { StatProps } from './Stat';

export default function MainStat(props: StatProps) {
  return (
    <div className="rounded-xl border flex flex-col place-items-center justify-center w-full p-2 border-neutral-300 dark:border-neutral-700 text-center shadow-md dark:shadow-neutral-800">
      <label className="text-base font-bold text-neutral-500 uppercase">{props.label}</label>
      <p className="text-xl font-medium text-neutral-700 dark:text-neutral-300">{props.stat}</p>
    </div>
  );
}

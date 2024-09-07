export interface StatProps {
  label: string;
  stat: string | number;
}

export default function Stat(props: StatProps) {
  return (
    <div className="max-w-[40rem] flex justify-between space-x-4">
      <label className="text-base font-bold uppercase text-neutral-500">{props.label}</label>
      <p className="text-base text-neutral-700 font-medium dark:text-neutral-300">{props.stat}</p>
    </div>
  );
}

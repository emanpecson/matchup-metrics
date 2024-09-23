import { InfoIcon } from 'lucide-react';

export default function Tip({ content }: { content: string }) {
  return (
    <div className="border p-4 rounded-xl w-fit h-fit relative border-neutral-300 dark:border-neutral-700">
      <InfoIcon className="text-neutral-500 dark:text-neutral-400 absolute" size={24} />
      <p className="text-neutral-500 dark:text-neutral-400 text-sm pl-8">{content}</p>
    </div>
  );
}

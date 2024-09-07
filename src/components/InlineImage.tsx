import { cn } from '@/lib/utils';
import Image from 'next/image';

interface InlineImageProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  rounded?: boolean;
}

export default function InlineImage(props: InlineImageProps) {
  return (
    <div className="flex space-x-1.5 place-items-center">
      <Image
        src={props.src}
        alt={props.alt}
        width={24}
        height={24}
        className={cn(
          props.rounded && 'rounded-full border dark:bg-neutral-800/80 bg-neutral-200/80',
          'w-[26px] h-[26px] object-cover'
        )}
        unoptimized
      />
      {props.children}
    </div>
  );
}

import Image from 'next/image';

export default function InlineImage({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} width={24} height={24} className="w-[26px] h-[26px] object-cover" />;
}

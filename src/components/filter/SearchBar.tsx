import { ChangeEvent, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { Input } from '../ui/input';
import { SearchIcon, XIcon } from 'lucide-react';
import CloseButton from '../button/CloseButton';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onValueChange: (x: string) => void;
  label?: string;
}

export default function SearchBar(props: SearchBarProps) {
  const [tempValue, setTempValue] = useState('');
  const [isFocussing, setIsFocussing] = useState(false);
  const debounced = useDebounceCallback(props.onValueChange, 500);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    debounced(ev.target.value);
    setTempValue(ev.target.value);
  };

  const handleReset = () => {
    props.onValueChange('');
    setTempValue('');
  };

  return (
    <div className="relative w-full max-w-[18rem]">
      <div>
        {tempValue ? (
          <CloseButton onClick={handleReset} className="absolute left-2 top-2" />
        ) : (
          <SearchIcon
            size={20}
            className={cn(
              isFocussing ? 'dark:text-white text-neutral-900' : 'text-neutral-500',
              'absolute left-2.5 top-2.5'
            )}
          />
        )}
      </div>

      <Input
        onChange={handleChange}
        type="text"
        value={tempValue}
        className="rounded-lg pl-10 text-sm placeholder:text-neutral-500 placeholder:font-medium"
        placeholder={props.label ?? 'Search'}
        onFocus={() => setIsFocussing(true)}
        onBlur={() => setIsFocussing(false)}
      />
    </div>
  );
}

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';

export default function PositionSelect({ onChange }: { onChange: (pos: string) => void }) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-fit space-x-4">
        <div className="flex space-x-1.5 place-items-center">
          <PuzzlePieceIcon className="w-6" />
          <SelectValue placeholder="Position" />
        </div>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="G">{'Guard (G)'}</SelectItem>
        <SelectItem value="F">{'Forward (F)'}</SelectItem>
        <SelectItem value="C">{'Center (C)'}</SelectItem>
      </SelectContent>
    </Select>
  );
}

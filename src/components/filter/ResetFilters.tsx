import { Button } from '../ui/button';

export default function ResetFilters({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <Button variant={'outline'} onClick={onClick} disabled={disabled}>
      Clear Filters
    </Button>
  );
}

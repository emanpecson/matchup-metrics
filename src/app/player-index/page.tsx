import PlayerIndex from '@/components/player/PlayerIndex';

export default function PlayerIndexPage() {
  return (
    <div className="w-full sm:pl-16">
      <PlayerIndex rowCount={12} disabledPlayerIds={[]} />
    </div>
  );
}

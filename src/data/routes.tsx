import { AppRoute } from '@/types/AppRoute';
import { GithubIcon, InfoIcon, SwordsIcon, TableIcon } from 'lucide-react';

export const routes: AppRoute[] = [
  // { name: 'Home', path: '/', Icon: HomeIcon },
  { name: 'Matchup', path: '/', Icon: SwordsIcon, external: false },
  // { name: 'Roster Builder', path: '/roster-builder' },
  { name: 'Players', path: '/players', Icon: TableIcon, external: false },
  { name: 'About', path: 'https://emanpecson.com/projects/matchup-metrics', Icon: InfoIcon, external: true },
  { name: 'GitHub', path: 'https://github.com/emanpecson/matchup-metrics', Icon: GithubIcon, external: true },
];

import { AppRoute } from '@/types/AppRoute';
import { GithubIcon, HomeIcon, InfoIcon, SwordsIcon, TableIcon } from 'lucide-react';

export const routes: AppRoute[] = [
  { name: 'Home', path: '/', Icon: HomeIcon },
  { name: 'Matchup', path: '/matchup', Icon: SwordsIcon },
  // { name: 'Roster Builder', path: '/roster-builder' },
  { name: 'Players', path: '/players', Icon: TableIcon },
  { name: 'About', path: 'https://emanpecson.com/projects/nba-fantasy-optimizer', Icon: InfoIcon },
  { name: 'GitHub', path: 'https://github.com/emanpecson/nba-fantasy-optimizer', Icon: GithubIcon },
];

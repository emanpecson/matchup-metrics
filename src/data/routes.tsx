import { AppRoute } from '@/types/AppRoute';
import { GithubIcon, InfoIcon, SwordsIcon, TableIcon } from 'lucide-react';

export const routes: AppRoute[] = [
  { name: 'Compare', path: '/compare', Icon: SwordsIcon },
  // { name: 'Roster Builder', path: '/roster-builder' },
  { name: 'Player Index', path: '/player-index', Icon: TableIcon },
  { name: 'About', path: 'https://emanpecson.com/projects/nba-fantasy-optimizer', Icon: InfoIcon },
  { name: 'GitHub', path: 'https://github.com/emanpecson/nba-fantasy-optimizer', Icon: GithubIcon },
];

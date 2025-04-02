import { LucideIcon } from 'lucide-react';

export interface AppRoute {
  name: string;
  path: string;
  Icon: LucideIcon;
  external: boolean;
}

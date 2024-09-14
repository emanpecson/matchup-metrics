import teams from '@/data/teams';
import { useTheme } from 'next-themes';

export const getPlayerPhotoUrl = (playerNbaId: string) => {
  return `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerNbaId}.png`;
};

export const getTeamLogoUrl = (teamAbbreviation: string, useDark?: boolean) => {
  const { resolvedTheme } = useTheme();
  const teamNbaId = teams[teamAbbreviation as keyof typeof teams].nbaId;

  let logoTheme = '';
  if (useDark === undefined) {
    logoTheme = resolvedTheme === 'dark' ? 'D' : 'L';
  } else {
    logoTheme = useDark ? 'D' : 'L';
  }

  return `https://cdn.nba.com/logos/nba/${teamNbaId}/primary/${logoTheme}/logo.svg`;
};

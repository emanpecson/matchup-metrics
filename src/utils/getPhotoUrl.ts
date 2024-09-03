import { useTheme } from 'next-themes';

export const getPlayerPhotoUrl = (nbaId: string) => {
  return `https://cdn.nba.com/headshots/nba/latest/1040x760/${nbaId}.png`;
};

export const getTeamLogoUrl = (teamId: string, useDark?: boolean) => {
  const { resolvedTheme } = useTheme();

  let logoTheme = '';
  if (useDark === undefined) {
    logoTheme = resolvedTheme === 'dark' ? 'D' : 'L';
  } else {
    logoTheme = useDark ? 'D' : 'L';
  }

  return `https://cdn.nba.com/logos/nba/${teamId}/primary/${logoTheme}/logo.svg`;
};

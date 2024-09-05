import { useTheme } from 'next-themes';

export const getPlayerPhotoUrl = (playerNbaId: string) => {
  return `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerNbaId}.png`;
};

export const getTeamLogoUrl = (teamNbaId: string, useDark?: boolean) => {
  const { resolvedTheme } = useTheme();

  let logoTheme = '';
  if (useDark === undefined) {
    logoTheme = resolvedTheme === 'dark' ? 'D' : 'L';
  } else {
    logoTheme = useDark ? 'D' : 'L';
  }

  return `https://cdn.nba.com/logos/nba/${teamNbaId}/primary/${logoTheme}/logo.svg`;
};

import teams from '@/data/teams';

export const getPlayerPhotoUrl = (playerNbaId: string) => {
  return `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerNbaId}.png`;
};

export const getTeamLogoUrl = (teamAbbreviation: string, useDark: boolean) => {
  const teamNbaId = teams[teamAbbreviation as keyof typeof teams].nbaId;
  const logoTheme = useDark ? 'D' : 'L';

  return `https://cdn.nba.com/logos/nba/${teamNbaId}/primary/${logoTheme}/logo.svg`;
};

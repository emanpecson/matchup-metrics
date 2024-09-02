const getPhotoUrl = (nbaId: string) => {
  return `https://cdn.nba.com/headshots/nba/latest/1040x760/${nbaId}.png`;
};

export default getPhotoUrl;

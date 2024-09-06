export interface TeamInfo {
  nbaId: string;
  abbreviation: string;
  city: string;
  name: string;
}

const teams = {
  ATL: { nbaId: '1610612737', abbreviation: 'ATL', city: 'Atlanta', name: 'Hawks' },
  BOS: { nbaId: '1610612738', abbreviation: 'BOS', city: 'Boston', name: 'Celtics' },
  BKN: { nbaId: '1610612751', abbreviation: 'BKN', city: 'Brooklyn', name: 'Nets' },
  CHA: { nbaId: '1610612766', abbreviation: 'CHA', city: 'Charlotte', name: 'Hornets' },
  CHI: { nbaId: '1610612741', abbreviation: 'CHI', city: 'Chicago', name: 'Bulls' },
  CLE: { nbaId: '1610612739', abbreviation: 'CLE', city: 'Cleveland', name: 'Cavaliers' },
  DAL: { nbaId: '1610612742', abbreviation: 'DAL', city: 'Dallas', name: 'Mavericks' },
  DEN: { nbaId: '1610612743', abbreviation: 'DEN', city: 'Denver', name: 'Nuggets' },
  DET: { nbaId: '1610612765', abbreviation: 'DET', city: 'Detroit', name: 'Pistons' },
  GSW: { nbaId: '1610612744', abbreviation: 'GSW', city: 'Golden State', name: 'Warriors' },
  HOU: { nbaId: '1610612745', abbreviation: 'HOU', city: 'Houston', name: 'Rockets' },
  IND: { nbaId: '1610612754', abbreviation: 'IND', city: 'Indiana', name: 'Pacers' },
  LAC: { nbaId: '1610612746', abbreviation: 'LAC', city: 'Los Angeles', name: 'Clippers' },
  LAL: { nbaId: '1610612747', abbreviation: 'LAL', city: 'Los Angeles', name: 'Lakers' },
  MEM: { nbaId: '1610612763', abbreviation: 'MEM', city: 'Memphis', name: 'Grizzlies' },
  MIA: { nbaId: '1610612748', abbreviation: 'MIA', city: 'Miami', name: 'Heat' },
  MIL: { nbaId: '1610612749', abbreviation: 'MIL', city: 'Milwaukee', name: 'Bucks' },
  MIN: { nbaId: '1610612750', abbreviation: 'MIN', city: 'Minnesota', name: 'Timberwolves' },
  NOP: { nbaId: '1610612740', abbreviation: 'NOP', city: 'New Orleans', name: 'Pelicans' },
  NYK: { nbaId: '1610612752', abbreviation: 'NYK', city: 'New York', name: 'Knicks' },
  OKC: { nbaId: '1610612760', abbreviation: 'OKC', city: 'Oklahoma City', name: 'Thunder' },
  ORL: { nbaId: '1610612753', abbreviation: 'ORL', city: 'Orlando', name: 'Magic' },
  PHI: { nbaId: '1610612755', abbreviation: 'PHI', city: 'Philadelphia', name: '76ers' },
  PHX: { nbaId: '1610612756', abbreviation: 'PHX', city: 'Phoenix', name: 'Suns' },
  POR: { nbaId: '1610612757', abbreviation: 'POR', city: 'Portland', name: 'Trail Blazers' },
  SAC: { nbaId: '1610612758', abbreviation: 'SAC', city: 'Sacramento', name: 'Kings' },
  SAS: { nbaId: '1610612759', abbreviation: 'SAS', city: 'San Antonio', name: 'Spurs' },
  TOR: { nbaId: '1610612761', abbreviation: 'TOR', city: 'Toronto', name: 'Raptors' },
  UTA: { nbaId: '1610612762', abbreviation: 'UTA', city: 'Utah', name: 'Jazz' },
  WAS: { nbaId: '1610612764', abbreviation: 'WAS', city: 'Washington', name: 'Wizards' },
};

export default teams;

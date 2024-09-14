import positions from '@/data/positions';
import teams from '@/data/teams';

export const reformatPosition = (pos: keyof typeof positions | '-') => {
  let fullPosition = '';
  for (const ch of pos) {
    if (ch === 'G') fullPosition += 'Guard';
    if (ch === 'F') fullPosition += 'Forward';
    if (ch === 'C') fullPosition += 'Center';
    if (ch === '-') fullPosition += '/';
  }
  return fullPosition;
};

export const reformatHeight = (h: string) => {
  const [feet, inches] = h.split('-');
  return `${feet}'${inches}"`;
};

export const shortName = (name: string) => {
  const [firstName, lastName] = name.split(' ');
  return `${firstName[0]}. ${lastName}`;
};

export const fullTeamName = (abbreviation: string) => {
  const team = teams[abbreviation as keyof typeof teams];
  return `${team.city} ${team.name}`;
};

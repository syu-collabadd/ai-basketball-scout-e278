export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  height: string;
  weight: string;
  team: string;
  photoInitials: string;
  accentColor: string;
  stats: {
    ppg: number;
    rpg: number;
    apg: number;
    spg: number;
    bpg: number;
    fg: number;
    fg3: number;
    ft: number;
    tov: number;
    plusMinus: number;
  };
  trend: 'up' | 'down' | 'stable';
  gameLog: GameLogEntry[];
  tendencies: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface GameLogEntry {
  date: string;
  opponent: string;
  min: number;
  pts: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  fg: string;
  fg3: string;
  ft: string;
  plusMinus: number;
}

export interface LineupEntry {
  players: string[];
  minutes: number;
  netRating: number;
  offRating: number;
  defRating: number;
  efgPct: number;
}

export interface AIInsight {
  category: string;
  severity: 'critical' | 'warning' | 'info' | 'positive';
  title: string;
  body: string;
  tags: string[];
}

export const teams = {
  home: {
    name: 'Lakeside Wolves',
    city: 'Lakeside',
    abbreviation: 'LAK',
    record: '28-14',
    rank: 4,
    accentColor: '#3b82f6',
  },
  away: {
    name: 'Riverside Raptors',
    city: 'Riverside',
    abbreviation: 'RIV',
    record: '31-11',
    rank: 2,
    accentColor: '#f97316',
  },
};

export const gameResult = {
  homeScore: 108,
  awayScore: 114,
  date: '2026-05-17',
  venue: 'Lakeside Arena',
  attendance: 18_422,
  gameId: 'GAM-20260517-LAK-RIV',
  quarters: [
    { home: 28, away: 31 },
    { home: 27, away: 24 },
    { home: 26, away: 30 },
    { home: 27, away: 29 },
  ],
};

export const players: Player[] = [
  {
    id: 'p1',
    name: 'Marcus Webb',
    number: 23,
    position: 'SG',
    height: "6'5\"",
    weight: '210 lbs',
    team: 'LAK',
    photoInitials: 'MW',
    accentColor: '#3b82f6',
    stats: { ppg: 24.8, rpg: 4.2, apg: 5.1, spg: 1.4, bpg: 0.3, fg: 47.2, fg3: 38.1, ft: 87.4, tov: 2.8, plusMinus: 5.2 },
    trend: 'up',
    tendencies: [
      'Prefers pull-up mid-range off screen actions on the right side',
      'Drives left 68% of the time when attacking off the dribble',
      'Excellent catch-and-shoot player from the left corner (44.3%)',
    ],
    strengths: ['Isolation scorer', 'Pick-and-roll ball handler', 'Late-game shot creator'],
    weaknesses: ['Struggles against physical wing defenders', 'Below-average post defense'],
    gameLog: [
      { date: '05/17', opponent: 'RIV', min: 36, pts: 31, reb: 5, ast: 6, stl: 2, blk: 0, fg: '11/22', fg3: '4/9', ft: '5/5', plusMinus: -3 },
      { date: '05/14', opponent: 'NOR', min: 38, pts: 27, reb: 4, ast: 7, stl: 1, blk: 0, fg: '10/19', fg3: '3/7', ft: '4/4', plusMinus: 12 },
      { date: '05/11', opponent: 'STR', min: 34, pts: 22, reb: 3, ast: 4, stl: 2, blk: 1, fg: '8/17', fg3: '3/8', ft: '3/4', plusMinus: 7 },
      { date: '05/08', opponent: 'VLY', min: 37, pts: 29, reb: 6, ast: 5, stl: 0, blk: 0, fg: '11/20', fg3: '4/8', ft: '3/3', plusMinus: 9 },
      { date: '05/05', opponent: 'BAY', min: 39, pts: 18, reb: 4, ast: 8, stl: 1, blk: 0, fg: '6/16', fg3: '2/7', ft: '4/5', plusMinus: -6 },
      { date: '05/02', opponent: 'OAK', min: 35, pts: 24, reb: 5, ast: 4, stl: 3, blk: 0, fg: '9/18', fg3: '3/6', ft: '3/3', plusMinus: 4 },
    ],
  },
  {
    id: 'p2',
    name: 'Darius Cole',
    number: 5,
    position: 'PG',
    height: "6'2\"",
    weight: '195 lbs',
    team: 'LAK',
    photoInitials: 'DC',
    accentColor: '#3b82f6',
    stats: { ppg: 18.3, rpg: 3.1, apg: 9.4, spg: 1.8, bpg: 0.2, fg: 43.1, fg3: 35.7, ft: 79.2, tov: 3.5, plusMinus: 3.7 },
    trend: 'stable',
    tendencies: [
      'High pick-and-roll usage (38% of possessions)',
      'Elite rim-finishing rate (66% at rim)',
      'Generates high free throw rate — 6.2 FTA per game',
    ],
    strengths: ['Pick-and-roll orchestration', 'Transition offense', 'Defensive disruption'],
    weaknesses: ['Below-average three-point shooter under pressure', 'Turnover-prone in half-court sets'],
    gameLog: [
      { date: '05/17', opponent: 'RIV', min: 34, pts: 16, reb: 3, ast: 11, stl: 2, blk: 0, fg: '6/14', fg3: '1/5', ft: '3/4', plusMinus: -8 },
      { date: '05/14', opponent: 'NOR', min: 36, pts: 19, reb: 4, ast: 10, stl: 3, blk: 0, fg: '7/16', fg3: '2/6', ft: '3/3', plusMinus: 15 },
      { date: '05/11', opponent: 'STR', min: 33, pts: 14, reb: 2, ast: 8, stl: 1, blk: 0, fg: '5/12', fg3: '1/4', ft: '3/4', plusMinus: 5 },
      { date: '05/08', opponent: 'VLY', min: 38, pts: 22, reb: 5, ast: 12, stl: 2, blk: 0, fg: '8/17', fg3: '2/5', ft: '4/6', plusMinus: 11 },
      { date: '05/05', opponent: 'BAY', min: 37, pts: 20, reb: 3, ast: 9, stl: 1, blk: 1, fg: '7/15', fg3: '3/7', ft: '3/4', plusMinus: -4 },
      { date: '05/02', opponent: 'OAK', min: 36, pts: 17, reb: 4, ast: 8, stl: 2, blk: 0, fg: '6/13', fg3: '2/5', ft: '3/4', plusMinus: 6 },
    ],
  },
  {
    id: 'p3',
    name: 'Jordan Hayes',
    number: 34,
    position: 'C',
    height: "7'0\"",
    weight: '255 lbs',
    team: 'LAK',
    photoInitials: 'JH',
    accentColor: '#3b82f6',
    stats: { ppg: 16.1, rpg: 11.8, apg: 2.4, spg: 0.8, bpg: 2.3, fg: 59.4, fg3: 28.1, ft: 68.9, tov: 1.9, plusMinus: 6.8 },
    trend: 'up',
    tendencies: [
      'Dominant interior scorer — 74% of shots at or near rim',
      'Excellent drop coverage on pick-and-roll defense',
      'Soft touch on mid-range floater (47%)',
    ],
    strengths: ['Interior scoring', 'Defensive rebounding', 'Shot-blocking presence'],
    weaknesses: ['Free throw shooting limits late-game usage', 'Slow lateral movement against stretch bigs'],
    gameLog: [
      { date: '05/17', opponent: 'RIV', min: 30, pts: 18, reb: 14, ast: 3, stl: 0, blk: 3, fg: '7/11', fg3: '0/1', ft: '4/7', plusMinus: 2 },
      { date: '05/14', opponent: 'NOR', min: 32, pts: 14, reb: 12, ast: 2, stl: 1, blk: 2, fg: '6/10', fg3: '0/0', ft: '2/4', plusMinus: 8 },
      { date: '05/11', opponent: 'STR', min: 28, pts: 20, reb: 10, ast: 4, stl: 0, blk: 4, fg: '9/14', fg3: '0/1', ft: '2/3', plusMinus: 14 },
      { date: '05/08', opponent: 'VLY', min: 31, pts: 16, reb: 13, ast: 1, stl: 0, blk: 2, fg: '6/9', fg3: '0/0', ft: '4/6', plusMinus: 7 },
      { date: '05/05', opponent: 'BAY', min: 33, pts: 12, reb: 9, ast: 3, stl: 1, blk: 1, fg: '4/8', fg3: '0/1', ft: '4/8', plusMinus: -9 },
      { date: '05/02', opponent: 'OAK', min: 30, pts: 19, reb: 11, ast: 2, stl: 0, blk: 3, fg: '8/12', fg3: '0/0', ft: '3/5', plusMinus: 10 },
    ],
  },
  {
    id: 'p4',
    name: 'Tyrese Grant',
    number: 11,
    position: 'SF',
    height: "6'8\"",
    weight: '225 lbs',
    team: 'RIV',
    photoInitials: 'TG',
    accentColor: '#f97316',
    stats: { ppg: 22.4, rpg: 6.7, apg: 3.8, spg: 1.6, bpg: 0.9, fg: 49.3, fg3: 41.2, ft: 83.1, tov: 2.1, plusMinus: 8.4 },
    trend: 'up',
    tendencies: [
      'Elite corner three specialist (47.2% from left corner)',
      'Off-ball movement — excels in hand-off and cut situations',
      'Excellent secondary break scorer after defensive rebounds',
    ],
    strengths: ['Three-point shooting', 'Defensive versatility', 'Transition scoring'],
    weaknesses: ['Limited isolation playmaking', 'Struggles finishing against shot-blockers'],
    gameLog: [
      { date: '05/17', opponent: 'LAK', min: 37, pts: 26, reb: 8, ast: 4, stl: 2, blk: 1, fg: '10/19', fg3: '5/9', ft: '1/1', plusMinus: 9 },
      { date: '05/14', opponent: 'STR', min: 36, pts: 22, reb: 7, ast: 3, stl: 1, blk: 0, fg: '8/17', fg3: '4/8', ft: '2/2', plusMinus: 6 },
      { date: '05/11', opponent: 'BAY', min: 38, pts: 28, reb: 9, ast: 5, stl: 3, blk: 1, fg: '11/21', fg3: '5/10', ft: '1/1', plusMinus: 18 },
      { date: '05/08', opponent: 'NOR', min: 35, pts: 18, reb: 5, ast: 2, stl: 0, blk: 0, fg: '7/14', fg3: '3/7', ft: '1/2', plusMinus: 4 },
      { date: '05/05', opponent: 'OAK', min: 39, pts: 24, reb: 6, ast: 4, stl: 2, blk: 1, fg: '9/18', fg3: '4/8', ft: '2/2', plusMinus: 12 },
      { date: '05/02', opponent: 'VLY', min: 34, pts: 20, reb: 7, ast: 3, stl: 1, blk: 0, fg: '8/16', fg3: '3/7', ft: '1/1', plusMinus: 7 },
    ],
  },
  {
    id: 'p5',
    name: 'Antoine Rivers',
    number: 3,
    position: 'PG',
    height: "6'1\"",
    weight: '190 lbs',
    team: 'RIV',
    photoInitials: 'AR',
    accentColor: '#f97316',
    stats: { ppg: 20.1, rpg: 3.4, apg: 10.7, spg: 2.1, bpg: 0.4, fg: 44.8, fg3: 36.9, ft: 85.2, tov: 2.9, plusMinus: 7.1 },
    trend: 'up',
    tendencies: [
      'Elite pace-setter — pushes tempo immediately off live-ball rebounds',
      'Prefers right-hand floater in the lane (55% conversion)',
      'Excellent in pick-and-roll as both handler and screener facilitator',
    ],
    strengths: ['Transition orchestration', 'Defensive steals and deflections', 'Clutch shooting'],
    weaknesses: ['Shot selection in half-court can be inconsistent', 'Physical defense at point of attack'],
    gameLog: [
      { date: '05/17', opponent: 'LAK', min: 35, pts: 22, reb: 3, ast: 13, stl: 3, blk: 0, fg: '8/16', fg3: '3/7', ft: '3/4', plusMinus: 11 },
      { date: '05/14', opponent: 'STR', min: 36, pts: 18, reb: 4, ast: 11, stl: 2, blk: 0, fg: '7/15', fg3: '2/6', ft: '2/3', plusMinus: 9 },
      { date: '05/11', opponent: 'BAY', min: 38, pts: 24, reb: 3, ast: 12, stl: 3, blk: 1, fg: '9/18', fg3: '3/8', ft: '3/3', plusMinus: 16 },
      { date: '05/08', opponent: 'NOR', min: 34, pts: 16, reb: 5, ast: 9, stl: 1, blk: 0, fg: '6/13', fg3: '2/5', ft: '2/2', plusMinus: 5 },
      { date: '05/05', opponent: 'OAK', min: 37, pts: 21, reb: 2, ast: 10, stl: 2, blk: 0, fg: '8/17', fg3: '3/7', ft: '2/2', plusMinus: 8 },
      { date: '05/02', opponent: 'VLY', min: 36, pts: 19, reb: 4, ast: 9, stl: 2, blk: 0, fg: '7/16', fg3: '3/7', ft: '2/3', plusMinus: 6 },
    ],
  },
];

export const lineups: LineupEntry[] = [
  { players: ['Webb', 'Cole', 'Hayes', 'Torres', 'Mercer'], minutes: 18.3, netRating: 9.2, offRating: 115.4, defRating: 106.2, efgPct: 56.8 },
  { players: ['Webb', 'Cole', 'Hayes', 'Torres', 'Barkley'], minutes: 14.7, netRating: 4.1, offRating: 112.3, defRating: 108.2, efgPct: 53.4 },
  { players: ['Cole', 'Hayes', 'Torres', 'Mercer', 'Barkley'], minutes: 12.1, netRating: -2.3, offRating: 108.7, defRating: 111.0, efgPct: 50.2 },
  { players: ['Webb', 'Torres', 'Mercer', 'Barkley', 'Simmons'], minutes: 9.8, netRating: -6.4, offRating: 104.2, defRating: 110.6, efgPct: 47.9 },
  { players: ['Cole', 'Webb', 'Torres', 'Simmons', 'Barkley'], minutes: 8.4, netRating: 1.7, offRating: 110.9, defRating: 109.2, efgPct: 51.8 },
];

export const aiInsights: AIInsight[] = [
  {
    category: 'Defensive Vulnerability',
    severity: 'critical',
    title: 'Lakeside Exposed in Pick-and-Roll Drop Coverage',
    body: 'Riverside generated 1.18 PPP on pick-and-roll actions against Lakeside\'s drop coverage. Rivers and Grant combined for 8 mid-range jumpers off these sets — all converted. Recommend switching to a hedge or blitz scheme in Q3/Q4 situations, particularly when Rivers is in ball-handler role.',
    tags: ['Pick-and-Roll', 'Defense', 'Rivers', 'Grant'],
  },
  {
    category: 'Offensive Efficiency',
    severity: 'positive',
    title: 'Webb + Hayes Two-Man Game is Elite',
    body: 'The Webb–Hayes pick-and-roll generated 1.24 PPP across 22 possessions — the highest efficiency two-man combination for either team. Hayes\'s roll gravity pulled both weakside defenders, creating open mid-range opportunities for Webb. Lean into this action more aggressively in the first half.',
    tags: ['Pick-and-Roll', 'Offense', 'Webb', 'Hayes'],
  },
  {
    category: 'Transition Defense',
    severity: 'critical',
    title: 'Riverside Scores 1.28 PPP in Transition',
    body: 'Rivers pushed pace immediately after 14 live-ball turnovers, converting 9 transition opportunities for 18 points. Lakeside\'s wings failed to sprint back consistently — particularly after missed three-point attempts. Transition defense accountability is a top priority for the next preparation unit.',
    tags: ['Transition', 'Defense', 'Rivers', 'Turnovers'],
  },
  {
    category: 'Rebounding',
    severity: 'warning',
    title: 'Second Chance Points Margin: RIV +8',
    body: 'Riverside grabbed 14 offensive rebounds leading to 18 second-chance points. Lakeside failed to maintain box-out positioning on drive-and-kick sequences — 6 of the 14 ORBs came on kick-out attempts. Hayes was the only Lakeside player maintaining consistent box-out discipline (82% box-out rate).',
    tags: ['Rebounding', 'Second Chance', 'Hayes'],
  },
  {
    category: 'Three-Point Strategy',
    severity: 'info',
    title: 'Grant\'s Corner Three Cadence is Exploitable',
    body: 'Tyrese Grant shot 5-for-9 from three but 4 of those makes came from the left corner in two distinct motion sequences. He telegraphs his corner relocation 2 seconds before the ball handler changes direction. Close-out rules for left corner Grant: stunt early, force him baseline, deny the swing pass.',
    tags: ['Three-Point', 'Grant', 'Defense', 'Tendency'],
  },
  {
    category: 'Lineup Insight',
    severity: 'positive',
    title: 'Closing Lineup Net Rating: +9.2 in 18 Min',
    body: 'The Webb–Cole–Hayes–Torres–Mercer five-man unit remains Lakeside\'s strongest closing group with a +9.2 net rating over 18.3 minutes together. This lineup generated a 56.8% eFG% on offense while holding opponents to a 44.1% eFG%. Preserve this unit\'s minutes for critical Q4 stretches.',
    tags: ['Lineup', 'Efficiency', 'Closing'],
  },
];

export const teamStats = {
  lak: {
    offRating: 109.4,
    defRating: 113.7,
    pace: 98.2,
    efgPct: 51.3,
    tsPct: 56.8,
    toRate: 14.2,
    orbPct: 22.1,
    drbPct: 74.6,
    ftRate: 0.241,
  },
  riv: {
    offRating: 116.8,
    defRating: 107.3,
    pace: 101.4,
    efgPct: 56.2,
    tsPct: 61.4,
    toRate: 11.8,
    orbPct: 28.4,
    drbPct: 76.2,
    ftRate: 0.289,
  },
};

export const performanceTrend = [
  { game: 'G1', pts: 18, reb: 4, ast: 8 },
  { game: 'G2', pts: 24, reb: 5, ast: 4 },
  { game: 'G3', pts: 29, reb: 6, ast: 5 },
  { game: 'G4', pts: 22, reb: 3, ast: 4 },
  { game: 'G5', pts: 27, reb: 4, ast: 7 },
  { game: 'G6', pts: 31, reb: 5, ast: 6 },
];

export const shotZoneData = [
  { zone: 'Rim', pct: 68, attempts: 31 },
  { zone: 'Mid (L)', pct: 44, attempts: 18 },
  { zone: 'Mid (R)', pct: 39, attempts: 21 },
  { zone: 'Corner 3 (L)', pct: 44, attempts: 9 },
  { zone: 'Corner 3 (R)', pct: 33, attempts: 6 },
  { zone: 'Above Break', pct: 36, attempts: 22 },
];

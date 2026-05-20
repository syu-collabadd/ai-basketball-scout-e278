import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Loader2, ChevronRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import InsightCard from '../components/InsightCard';
import { teams, gameResult, aiInsights, teamStats, players } from '../data/mockData';

const DEMO_URL = 'https://stats.basketball.com/game/GAM-20260517-LAK-RIV';

const quarterData = gameResult.quarters.map((q, i) => ({
  quarter: `Q${i + 1}`,
  LAK: q.home,
  RIV: q.away,
}));

const teamCompareData = [
  { label: 'Off Rtg', LAK: teamStats.lak.offRating, RIV: teamStats.riv.offRating },
  { label: 'Def Rtg', LAK: teamStats.lak.defRating, RIV: teamStats.riv.defRating },
  { label: 'eFG%',   LAK: teamStats.lak.efgPct,    RIV: teamStats.riv.efgPct },
  { label: 'TS%',    LAK: teamStats.lak.tsPct,      RIV: teamStats.riv.tsPct },
];

const CHART_STYLE = {
  background: 'var(--surface)',
  borderColor: 'var(--border)',
};

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setLoaded(true); }, 2000);
  }

  function handleDemo() {
    setUrl(DEMO_URL);
    setLoading(true);
    setTimeout(() => { setLoading(false); setLoaded(true); }, 2000);
  }

  return (
    <div className="min-h-full">
      {/* Header */}
      <header
        className="sticky top-0 z-10 border-b px-6 h-14 flex items-center justify-between"
        style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
      >
        <div>
          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Dashboard</span>
        </div>
        <span
          className="text-[10px] font-bold tracking-widest uppercase"
          style={{ color: 'var(--faint)' }}
        >
          {gameResult.date}
        </span>
      </header>

      <div className="p-6 max-w-6xl mx-auto flex flex-col gap-8">

        {/* URL Input */}
        <div
          className="border rounded p-5"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--faint)' }}>
            Analyze Game
          </p>
          <form onSubmit={handleAnalyze} className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--faint)' }} />
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="Paste game URL from any stats provider..."
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded border outline-none transition-colors"
                style={{
                  background: 'var(--surface2)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--amber)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="px-5 py-2.5 rounded text-sm font-semibold transition-opacity disabled:opacity-40 flex items-center gap-2"
              style={{ background: 'var(--amber)', color: '#000' }}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : null}
              {loading ? 'Analyzing...' : 'Run Analysis'}
            </button>
          </form>
          {!loaded && !loading && (
            <p className="mt-2 text-[11px]" style={{ color: 'var(--faint)' }}>
              No game?{' '}
              <button onClick={handleDemo} className="underline underline-offset-2 hover:opacity-80" style={{ color: 'var(--amber)' }}>
                Load a demo
              </button>
            </p>
          )}
          {loading && (
            <div className="mt-3 flex flex-col gap-1.5">
              {['Fetching game data', 'Running AI analysis', 'Generating insights'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--amber)', animationDelay: `${i * 0.3}s` }} />
                  <span className="text-[11px]" style={{ color: 'var(--faint)' }}>{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {loaded && (
          <>
            {/* Scoreboard */}
            <div
              className="border rounded p-6"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--faint)' }}>
                  Final · {gameResult.venue}
                </p>
                <p className="text-[10px]" style={{ color: 'var(--faint)' }}>
                  {gameResult.attendance.toLocaleString()} attendance
                </p>
              </div>

              <div className="flex items-center justify-between">
                {/* Home */}
                <div>
                  <p className="text-xs font-semibold tracking-wide uppercase mb-0.5" style={{ color: 'var(--muted)' }}>
                    {teams.home.city}
                  </p>
                  <p className="text-lg font-black" style={{ color: 'var(--text)' }}>
                    {teams.home.name.split(' ')[1]}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--faint)' }}>
                    {teams.home.record} · #{teams.home.rank} Seed
                  </p>
                </div>

                {/* Score */}
                <div className="text-center">
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-black tabular leading-none" style={{ color: 'var(--text)' }}>
                      {gameResult.homeScore}
                    </span>
                    <span className="text-xl font-light" style={{ color: 'var(--faint)' }}>—</span>
                    <span className="text-5xl font-black tabular leading-none" style={{ color: 'var(--amber)' }}>
                      {gameResult.awayScore}
                    </span>
                  </div>
                  <p className="text-[10px] mt-2 font-bold tracking-widest" style={{ color: 'var(--faint)' }}>FINAL</p>
                </div>

                {/* Away */}
                <div className="text-right">
                  <p className="text-xs font-semibold tracking-wide uppercase mb-0.5" style={{ color: 'var(--muted)' }}>
                    {teams.away.city}
                  </p>
                  <p className="text-lg font-black" style={{ color: 'var(--amber)' }}>
                    {teams.away.name.split(' ')[1]}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--faint)' }}>
                    {teams.away.record} · #{teams.away.rank} Seed
                  </p>
                </div>
              </div>

              {/* Quarter strip */}
              <div
                className="mt-5 pt-4 grid grid-cols-4 gap-2 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                {gameResult.quarters.map((q, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[9px] font-bold tracking-widest mb-1.5" style={{ color: 'var(--faint)' }}>Q{i + 1}</p>
                    <div className="flex items-center justify-center gap-2 text-xs font-bold tabular">
                      <span style={{ color: q.home > q.away ? 'var(--text)' : 'var(--faint)' }}>{q.home}</span>
                      <span style={{ color: 'var(--border2)' }}>·</span>
                      <span style={{ color: q.away > q.home ? 'var(--amber)' : 'var(--faint)' }}>{q.away}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard label="Off Rating (LAK)" value={teamStats.lak.offRating} subtext={`Opp: ${teamStats.riv.offRating}`} trend="down" />
              <StatCard label="Def Rating (LAK)" value={teamStats.lak.defRating} subtext={`Opp: ${teamStats.riv.defRating}`} trend="down" />
              <StatCard label="eFG% (LAK)" value={`${teamStats.lak.efgPct}%`} subtext={`Opp: ${teamStats.riv.efgPct}%`} trend="down" />
              <StatCard label="Pace" value={teamStats.lak.pace} subtext="possessions / game" />
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="border rounded p-5" style={CHART_STYLE}>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--faint)' }}>
                  Quarter Scoring
                </p>
                <ResponsiveContainer width="100%" height={190}>
                  <BarChart data={quarterData} barSize={22} barGap={3}>
                    <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: 'var(--faint)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--faint)' }} axisLine={false} tickLine={false} domain={[18, 36]} />
                    <Tooltip cursor={{ fill: 'var(--surface2)' }} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, color: 'var(--text)' }} />
                    <Bar dataKey="LAK" fill="var(--text)" radius={[2, 2, 0, 0]} opacity={0.7} />
                    <Bar dataKey="RIV" fill="var(--amber)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm" style={{ background: 'var(--text)', opacity: 0.7 }} /><span className="text-[11px]" style={{ color: 'var(--faint)' }}>Lakeside</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm" style={{ background: 'var(--amber)' }} /><span className="text-[11px]" style={{ color: 'var(--faint)' }}>Riverside</span></div>
                </div>
              </div>

              <div className="border rounded p-5" style={CHART_STYLE}>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--faint)' }}>
                  Efficiency Comparison
                </p>
                <ResponsiveContainer width="100%" height={190}>
                  <BarChart data={teamCompareData} layout="vertical" barSize={12} barGap={2}>
                    <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--faint)' }} axisLine={false} tickLine={false} domain={[45, 120]} />
                    <YAxis dataKey="label" type="category" tick={{ fontSize: 11, fill: 'var(--faint)' }} axisLine={false} tickLine={false} width={45} />
                    <Tooltip cursor={{ fill: 'var(--surface2)' }} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, color: 'var(--text)' }} />
                    <Bar dataKey="LAK" fill="var(--text)" radius={[0, 2, 2, 0]} opacity={0.7} />
                    <Bar dataKey="RIV" fill="var(--amber)" radius={[0, 2, 2, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm" style={{ background: 'var(--text)', opacity: 0.7 }} /><span className="text-[11px]" style={{ color: 'var(--faint)' }}>Lakeside</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm" style={{ background: 'var(--amber)' }} /><span className="text-[11px]" style={{ color: 'var(--faint)' }}>Riverside</span></div>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--faint)' }}>
                  AI Insights <span className="ml-2" style={{ color: 'var(--amber)' }}>{aiInsights.length}</span>
                </p>
                <Link to="/report" className="text-[11px] font-semibold flex items-center gap-0.5 hover:opacity-80" style={{ color: 'var(--amber)' }}>
                  Full Report <ChevronRight size={12} />
                </Link>
              </div>
              <div className="grid lg:grid-cols-2 gap-3">
                {aiInsights.slice(0, 4).map((insight, i) => (
                  <InsightCard key={i} insight={insight} compact />
                ))}
              </div>
            </div>

            {/* Key Players */}
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--faint)' }}>Key Performers</p>
                <Link to="/players" className="text-[11px] font-semibold flex items-center gap-0.5 hover:opacity-80" style={{ color: 'var(--amber)' }}>
                  All Players <ChevronRight size={12} />
                </Link>
              </div>
              <div className="border rounded overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                {/* table header */}
                <div
                  className="grid px-4 py-2 border-b"
                  style={{ gridTemplateColumns: '1fr auto auto auto auto auto', borderColor: 'var(--border)', background: 'var(--surface2)' }}
                >
                  <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: 'var(--faint)' }}>Player</span>
                  {['PTS', 'REB', 'AST', 'FG%', '+/-'].map(h => (
                    <span key={h} className="text-[9px] font-bold tracking-widest uppercase w-10 text-right" style={{ color: 'var(--faint)' }}>{h}</span>
                  ))}
                </div>
                {players.slice(0, 4).map((player, i) => (
                  <Link
                    key={player.id}
                    to={`/players/${player.id}`}
                    className="grid items-center px-4 py-3 hover:opacity-80 transition-opacity border-b last:border-0 group"
                    style={{
                      gridTemplateColumns: '1fr auto auto auto auto auto',
                      borderColor: 'var(--border)',
                      background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface2)',
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[10px] font-black tabular w-5 text-right" style={{ color: 'var(--faint)' }}>
                        {player.number}
                      </span>
                      <span className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{player.name}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-sm hidden sm:block" style={{ background: 'var(--surface2)', color: 'var(--faint)' }}>
                        {player.position}
                      </span>
                    </div>
                    {[player.stats.ppg, player.stats.rpg, player.stats.apg, `${player.stats.fg}%`, `+${player.stats.plusMinus}`].map((v, j) => (
                      <span key={j} className="text-sm font-bold tabular text-right w-10" style={{ color: j === 0 ? 'var(--text)' : 'var(--muted)' }}>
                        {v}
                      </span>
                    ))}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard label="TO Rate (LAK)" value={`${teamStats.lak.toRate}%`} subtext="per 100 possessions" trend="down" />
              <StatCard label="Off Reb% (LAK)" value={`${teamStats.lak.orbPct}%`} subtext={`Opp: ${teamStats.riv.orbPct}%`} trend="down" />
              <StatCard label="FT Rate (LAK)" value={teamStats.lak.ftRate} subtext="FTA per FGA" />
              <StatCard label="Attendance" value={gameResult.attendance.toLocaleString()} subtext={gameResult.venue} />
            </div>
          </>
        )}

        {/* Empty state */}
        {!loaded && !loading && (
          <div className="flex flex-col items-center justify-center py-28 gap-3">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--faint)' }}>
              Awaiting Game Data
            </p>
            <p className="text-xs" style={{ color: 'var(--faint)', opacity: 0.6 }}>
              Paste a URL above or load the demo game
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

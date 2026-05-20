import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Search, Loader2, ChevronRight, Activity, Shield, Zap, Target
} from 'lucide-react';
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
  { label: 'eFG%', LAK: teamStats.lak.efgPct, RIV: teamStats.riv.efgPct },
  { label: 'TS%', LAK: teamStats.lak.tsPct, RIV: teamStats.riv.tsPct },
];

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 2200);
  }

  function handleDemo() {
    setUrl(DEMO_URL);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 2200);
  }

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0a0c10]/90 backdrop-blur border-b border-[#1a2035] px-6 h-14 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-slate-100">Coaching Dashboard</h1>
          <p className="text-xs text-slate-500">AI-Powered Game Analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
            AI Ready
          </span>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">

        {/* URL Input Card */}
        <div className="bg-[#0d1017] border border-[#1a2035] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={16} className="text-blue-400" />
            <h2 className="text-sm font-semibold text-slate-200">Analyze a Game</h2>
          </div>
          <p className="text-xs text-slate-500 mb-4">Paste a game URL from any supported stats provider to generate AI scouting insights.</p>

          <form onSubmit={handleAnalyze} className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://stats.basketball.com/game/..."
                className="w-full bg-[#141929] border border-[#1a2035] rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Activity size={14} />}
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </form>

          {!loaded && !loading && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-slate-600">No game data? Try a</span>
              <button
                onClick={handleDemo}
                className="text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                demo game
              </button>
            </div>
          )}

          {loading && (
            <div className="mt-4 flex flex-col gap-2">
              {['Fetching game data...', 'Running AI analysis...', 'Generating insights...'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <Loader2 size={12} className="text-blue-400 animate-spin" style={{ animationDelay: `${i * 0.2}s` }} />
                  <span className="text-xs text-slate-500">{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Game loaded state */}
        {loaded && (
          <>
            {/* Scoreboard */}
            <div className="bg-[#0d1017] border border-[#1a2035] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-500 uppercase tracking-wider">Final Score</span>
                <span className="text-xs text-slate-500">{gameResult.date} · {gameResult.venue}</span>
              </div>
              <div className="flex items-center justify-between">
                {/* Home Team */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-400">{teams.home.abbreviation}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{teams.home.name}</p>
                      <p className="text-xs text-slate-500">{teams.home.record} · #{teams.home.rank} Seed</p>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="text-center">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-slate-200">{gameResult.homeScore}</span>
                    <span className="text-lg text-slate-600">–</span>
                    <span className="text-4xl font-black text-slate-200">{gameResult.awayScore}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{gameResult.attendance.toLocaleString()} fans</p>
                </div>

                {/* Away Team */}
                <div className="flex flex-col gap-1 items-end">
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <div className="w-9 h-9 rounded-lg bg-orange-600/20 border border-orange-500/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-orange-400">{teams.away.abbreviation}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-100">{teams.away.name}</p>
                      <p className="text-xs text-slate-500">{teams.away.record} · #{teams.away.rank} Seed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quarter scores */}
              <div className="mt-4 grid grid-cols-4 gap-2 border-t border-[#1a2035] pt-4">
                {gameResult.quarters.map((q, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[10px] text-slate-600 mb-1">Q{i + 1}</p>
                    <div className="flex items-center justify-center gap-1.5 text-xs font-semibold">
                      <span className={q.home > q.away ? 'text-blue-300' : 'text-slate-400'}>{q.home}</span>
                      <span className="text-slate-700">·</span>
                      <span className={q.away > q.home ? 'text-orange-300' : 'text-slate-400'}>{q.away}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard label="Off Rating (LAK)" value={teamStats.lak.offRating} subtext={`RIV: ${teamStats.riv.offRating}`} trend="down" />
              <StatCard label="Def Rating (LAK)" value={teamStats.lak.defRating} subtext={`RIV: ${teamStats.riv.defRating}`} trend="down" />
              <StatCard label="eFG% (LAK)" value={`${teamStats.lak.efgPct}%`} subtext={`RIV: ${teamStats.riv.efgPct}%`} trend="down" />
              <StatCard label="Pace" value={teamStats.lak.pace} subtext="possessions/game" />
            </div>

            {/* Charts + Insights Row */}
            <div className="grid lg:grid-cols-2 gap-5">
              {/* Quarter Scoring Chart */}
              <div className="bg-[#0d1017] border border-[#1a2035] rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-slate-200 mb-4">Quarter-by-Quarter Scoring</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={quarterData} barSize={24} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a2035" />
                    <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[18, 36]} />
                    <Tooltip
                      contentStyle={{ background: '#0d1017', border: '1px solid #1a2035', borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Bar dataKey="LAK" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="RIV" fill="#f97316" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-2 justify-center">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-blue-500" /><span className="text-xs text-slate-500">Lakeside</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-orange-500" /><span className="text-xs text-slate-500">Riverside</span></div>
                </div>
              </div>

              {/* Team Compare Chart */}
              <div className="bg-[#0d1017] border border-[#1a2035] rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-slate-200 mb-4">Team Efficiency Comparison</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={teamCompareData} layout="vertical" barSize={14} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a2035" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[45, 120]} />
                    <YAxis dataKey="label" type="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={45} />
                    <Tooltip
                      contentStyle={{ background: '#0d1017', border: '1px solid #1a2035', borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Bar dataKey="LAK" fill="#3b82f6" radius={[0, 3, 3, 0]} />
                    <Bar dataKey="RIV" fill="#f97316" radius={[0, 3, 3, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-2 justify-center">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-blue-500" /><span className="text-xs text-slate-500">Lakeside</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-orange-500" /><span className="text-xs text-slate-500">Riverside</span></div>
                </div>
              </div>
            </div>

            {/* AI Insights Preview */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap size={15} className="text-blue-400" />
                  <h2 className="text-sm font-semibold text-slate-200">AI Insights</h2>
                  <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded-full">{aiInsights.length}</span>
                </div>
                <Link to="/report" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
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
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target size={15} className="text-slate-400" />
                  <h2 className="text-sm font-semibold text-slate-200">Key Performers</h2>
                </div>
                <Link to="/players" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  All Players <ChevronRight size={12} />
                </Link>
              </div>
              <div className="grid gap-2">
                {players.slice(0, 3).map(player => (
                  <Link
                    key={player.id}
                    to={`/players/${player.id}`}
                    className="bg-[#0d1017] border border-[#1a2035] hover:border-[#2a3555] rounded-xl p-4 flex items-center gap-4 transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                      style={{ background: `${player.accentColor}22`, color: player.accentColor, border: `1px solid ${player.accentColor}44` }}
                    >
                      {player.photoInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-100">{player.name}</span>
                        <span className="text-xs text-slate-600">#{player.number}</span>
                        <span className="text-xs text-slate-500 bg-[#141929] px-1.5 py-0.5 rounded">{player.position}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{player.team}</p>
                    </div>
                    <div className="flex gap-4 text-center">
                      {[
                        { label: 'PTS', val: player.stats.ppg },
                        { label: 'REB', val: player.stats.rpg },
                        { label: 'AST', val: player.stats.apg },
                      ].map(s => (
                        <div key={s.label} className="w-10">
                          <p className="text-sm font-bold text-slate-100">{s.val}</p>
                          <p className="text-[10px] text-slate-600">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Defensive Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard label="TO Rate (LAK)" value={`${teamStats.lak.toRate}%`} subtext="turnovers per 100 poss" trend="down" />
              <StatCard label="OReb% (LAK)" value={`${teamStats.lak.orbPct}%`} subtext={`RIV: ${teamStats.riv.orbPct}%`} trend="down" />
              <StatCard label="FT Rate (LAK)" value={teamStats.lak.ftRate} subtext="FTA per FGA" />
              <StatCard label="Attendance" value={gameResult.attendance.toLocaleString()} subtext={gameResult.venue} />
            </div>
          </>
        )}

        {/* Empty state */}
        {!loaded && !loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0d1017] border border-[#1a2035] flex items-center justify-center">
              <Shield size={28} className="text-slate-700" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-400">Ready to scout</p>
              <p className="text-xs text-slate-600 mt-1">Paste a game URL above or load a demo game</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

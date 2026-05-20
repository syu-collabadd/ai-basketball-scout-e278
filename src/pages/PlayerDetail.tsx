import { useParams, Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { ChevronLeft, TrendingUp, TrendingDown, Minus, Target, Shield, Zap } from 'lucide-react';
import { players, performanceTrend, shotZoneData } from '../data/mockData';
import clsx from 'clsx';


export default function PlayerDetail() {
  const { id } = useParams();
  const player = players.find(p => p.id === id);

  if (!player) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-slate-400 mb-2">Player not found</p>
          <Link to="/players" className="text-blue-400 text-sm hover:underline">Back to players</Link>
        </div>
      </div>
    );
  }

  const trendIcon = player.trend === 'up'
    ? <TrendingUp size={14} className="text-emerald-400" />
    : player.trend === 'down'
    ? <TrendingDown size={14} className="text-red-400" />
    : <Minus size={14} className="text-slate-500" />;

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0a0c10]/90 backdrop-blur border-b border-[#1a2035] px-6 h-14 flex items-center gap-3">
        <Link to="/players" className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft size={18} />
        </Link>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: `${player.accentColor}22`, color: player.accentColor, border: `1px solid ${player.accentColor}44` }}
        >
          {player.photoInitials}
        </div>
        <h1 className="text-sm font-semibold text-slate-100">{player.name}</h1>
        <span className="text-xs text-slate-500">#{player.number} · {player.position}</span>
      </header>

      <div className="p-6 max-w-5xl mx-auto flex flex-col gap-5">
        {/* Player Hero */}
        <div className="bg-[#0d1017] border border-[#1a2035] rounded-2xl p-5">
          <div className="flex items-start gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0"
              style={{ background: `${player.accentColor}22`, color: player.accentColor, border: `1px solid ${player.accentColor}44` }}
            >
              {player.photoInitials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-slate-100">{player.name}</h2>
                {trendIcon}
                <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full',
                  player.trend === 'up' && 'bg-emerald-500/20 text-emerald-400',
                  player.trend === 'down' && 'bg-red-500/20 text-red-400',
                  player.trend === 'stable' && 'bg-slate-500/20 text-slate-400',
                )}>
                  {player.trend === 'up' ? 'Hot Streak' : player.trend === 'down' ? 'Cold Streak' : 'Consistent'}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">
                {player.position} · {player.height} · {player.weight} · {player.team}
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                {[
                  { label: 'PPG', val: player.stats.ppg },
                  { label: 'RPG', val: player.stats.rpg },
                  { label: 'APG', val: player.stats.apg },
                  { label: 'SPG', val: player.stats.spg },
                  { label: 'BPG', val: player.stats.bpg },
                  { label: '+/-', val: `+${player.stats.plusMinus}` },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-base font-bold text-slate-100">{s.val}</p>
                    <p className="text-[10px] text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shooting Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'FG%', val: `${player.stats.fg}%`, sub: 'Field Goal' },
            { label: '3P%', val: `${player.stats.fg3}%`, sub: 'Three-Point' },
            { label: 'FT%', val: `${player.stats.ft}%`, sub: 'Free Throw' },
          ].map(s => (
            <div key={s.label} className="bg-[#0d1017] border border-[#1a2035] rounded-xl p-4 text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{s.sub}</p>
              <p className="text-2xl font-bold text-slate-100">{s.val}</p>
              <div className="mt-2 h-1 bg-[#1a2035] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${parseFloat(s.val)}%`, background: player.accentColor }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Performance Trend */}
          <div className="bg-[#0d1017] border border-[#1a2035] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Performance Trend (Last 6 Games)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2035" />
                <XAxis dataKey="game" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#0d1017', border: '1px solid #1a2035', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Line type="monotone" dataKey="pts" stroke={player.accentColor} strokeWidth={2} dot={{ fill: player.accentColor, r: 3 }} name="PTS" />
                <Line type="monotone" dataKey="reb" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 3 }} name="REB" />
                <Line type="monotone" dataKey="ast" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} name="AST" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 justify-center">
              {[{ c: player.accentColor, l: 'PTS' }, { c: '#6366f1', l: 'REB' }, { c: '#10b981', l: 'AST' }].map(i => (
                <div key={i.l} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: i.c }} />
                  <span className="text-xs text-slate-500">{i.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shot Zone */}
          <div className="bg-[#0d1017] border border-[#1a2035] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Shot Zone Efficiency</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={shotZoneData} layout="vertical" barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2035" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" domain={[0, 80]} />
                <YAxis dataKey="zone" type="category" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={75} />
                <Tooltip
                  contentStyle={{ background: '#0d1017', border: '1px solid #1a2035', borderRadius: 8, fontSize: 12 }}
                  formatter={(val) => [`${val}%`, 'FG%']}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Bar dataKey="pct" radius={[0, 3, 3, 0]} name="FG%">
                  {shotZoneData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.pct >= 50 ? '#10b981' : entry.pct >= 40 ? '#f59e0b' : '#ef4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 justify-center">
              {[{ c: '#10b981', l: '≥50%' }, { c: '#f59e0b', l: '40-49%' }, { c: '#ef4444', l: '<40%' }].map(i => (
                <div key={i.l} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: i.c }} />
                  <span className="text-xs text-slate-500">{i.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tendencies + Strengths/Weaknesses */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 bg-[#0d1017] border border-[#1a2035] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target size={14} className="text-blue-400" />
              <h3 className="text-sm font-semibold text-slate-200">Tendencies</h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {player.tendencies.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-xs text-slate-400 leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0d1017] border border-[#1a2035] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-emerald-400" />
              <h3 className="text-sm font-semibold text-slate-200">Strengths</h3>
            </div>
            <ul className="flex flex-col gap-2">
              {player.strengths.map((s, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="text-xs text-slate-400">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0d1017] border border-[#1a2035] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={14} className="text-red-400" />
              <h3 className="text-sm font-semibold text-slate-200">Weaknesses</h3>
            </div>
            <ul className="flex flex-col gap-2">
              {player.weaknesses.map((w, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span className="text-xs text-slate-400">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Game Log */}
        <div className="bg-[#0d1017] border border-[#1a2035] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[#1a2035]">
            <h3 className="text-sm font-semibold text-slate-200">Recent Game Log</h3>
          </div>
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#1a2035]">
                  {['Date', 'OPP', 'MIN', 'PTS', 'REB', 'AST', 'STL', 'BLK', 'FG', '3P', 'FT', '+/-'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left font-medium text-slate-600 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {player.gameLog.map((game, i) => (
                  <tr key={i} className="border-b border-[#1a2035]/50 hover:bg-[#141929] transition-colors">
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{game.date}</td>
                    <td className="px-4 py-3 font-semibold text-slate-300 whitespace-nowrap">{game.opponent}</td>
                    <td className="px-4 py-3 text-slate-400">{game.min}</td>
                    <td className="px-4 py-3 font-bold text-slate-100">{game.pts}</td>
                    <td className="px-4 py-3 text-slate-300">{game.reb}</td>
                    <td className="px-4 py-3 text-slate-300">{game.ast}</td>
                    <td className="px-4 py-3 text-slate-400">{game.stl}</td>
                    <td className="px-4 py-3 text-slate-400">{game.blk}</td>
                    <td className="px-4 py-3 text-slate-400">{game.fg}</td>
                    <td className="px-4 py-3 text-slate-400">{game.fg3}</td>
                    <td className="px-4 py-3 text-slate-400">{game.ft}</td>
                    <td className={clsx('px-4 py-3 font-semibold', game.plusMinus > 0 ? 'text-emerald-400' : game.plusMinus < 0 ? 'text-red-400' : 'text-slate-500')}>
                      {game.plusMinus > 0 ? '+' : ''}{game.plusMinus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

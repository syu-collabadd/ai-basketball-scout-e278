import { useParams, Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { ChevronLeft } from 'lucide-react';
import { players, performanceTrend, shotZoneData } from '../data/mockData';

export default function PlayerDetail() {
  const { id } = useParams();
  const player = players.find(p => p.id === id);

  if (!player) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="mb-2" style={{ color: 'var(--muted)' }}>Player not found</p>
          <Link to="/players" className="text-sm underline" style={{ color: 'var(--amber)' }}>Back to players</Link>
        </div>
      </div>
    );
  }

  const isHome = player.team === 'LAK';

  return (
    <div className="min-h-full">
      {/* Header */}
      <header
        className="sticky top-0 z-10 border-b px-6 h-14 flex items-center gap-4"
        style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
      >
        <Link to="/players" className="hover:opacity-70 transition-opacity" style={{ color: 'var(--faint)' }}>
          <ChevronLeft size={18} />
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{player.name}</span>
          <span className="text-[11px]" style={{ color: 'var(--faint)' }}>#{player.number} · {player.position} · {player.team}</span>
        </div>
        <div className="ml-auto">
          <span
            className="text-xs font-black"
            style={{ color: player.trend === 'up' ? 'var(--green)' : player.trend === 'down' ? 'var(--red)' : 'var(--faint)' }}
          >
            {player.trend === 'up' ? '▲ Hot' : player.trend === 'down' ? '▼ Cold' : '— Avg'}
          </span>
        </div>
      </header>

      <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">

        {/* Hero stats bar */}
        <div
          className="border rounded p-5"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderLeft: `3px solid ${isHome ? '#9098a9' : 'var(--amber)'}` }}
        >
          <div className="flex items-start gap-6 flex-wrap">
            <div className="flex-shrink-0">
              <p className="text-[9px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--faint)' }}>
                {player.position} · {player.height} · {player.weight}
              </p>
              <p className="text-2xl font-black" style={{ color: 'var(--text)' }}>{player.name}</p>
            </div>
            <div className="flex gap-6 flex-wrap">
              {[
                { label: 'PPG', val: player.stats.ppg },
                { label: 'RPG', val: player.stats.rpg },
                { label: 'APG', val: player.stats.apg },
                { label: 'SPG', val: player.stats.spg },
                { label: 'BPG', val: player.stats.bpg },
                { label: '+/-', val: `+${player.stats.plusMinus}` },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-xl font-black tabular leading-none" style={{ color: 'var(--text)' }}>{s.val}</p>
                  <p className="text-[9px] font-bold tracking-widest uppercase mt-1" style={{ color: 'var(--faint)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shooting row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Field Goal %', val: player.stats.fg },
            { label: 'Three-Point %', val: player.stats.fg3 },
            { label: 'Free Throw %', val: player.stats.ft },
          ].map(s => (
            <div key={s.label} className="border rounded p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-[9px] font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--faint)' }}>{s.label}</p>
              <p className="text-3xl font-black tabular" style={{ color: 'var(--text)' }}>{s.val}<span className="text-sm font-bold ml-0.5" style={{ color: 'var(--faint)' }}>%</span></p>
              <div className="mt-2.5 h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
                <div className="h-full rounded-full" style={{ width: `${s.val}%`, background: isHome ? 'var(--muted)' : 'var(--amber)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Trend */}
          <div className="border rounded p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--faint)' }}>
              Last 6 Games
            </p>
            <ResponsiveContainer width="100%" height={195}>
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="game" tick={{ fontSize: 11, fill: 'var(--faint)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--faint)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, color: 'var(--text)' }} />
                <Line type="monotone" dataKey="pts" stroke={isHome ? 'var(--text)' : 'var(--amber)'} strokeWidth={2} dot={{ r: 3 }} name="PTS" />
                <Line type="monotone" dataKey="reb" stroke="#6366f1" strokeWidth={1.5} dot={{ r: 2 }} name="REB" strokeDasharray="4 2" />
                <Line type="monotone" dataKey="ast" stroke="var(--green)" strokeWidth={1.5} dot={{ r: 2 }} name="AST" strokeDasharray="4 2" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              {[
                { c: isHome ? 'var(--text)' : 'var(--amber)', l: 'PTS' },
                { c: '#6366f1', l: 'REB' },
                { c: 'var(--green)', l: 'AST' },
              ].map(i => (
                <div key={i.l} className="flex items-center gap-1.5">
                  <div className="w-2 h-0.5 rounded" style={{ background: i.c }} />
                  <span className="text-[11px]" style={{ color: 'var(--faint)' }}>{i.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shot zones */}
          <div className="border rounded p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--faint)' }}>
              Shot Zone FG%
            </p>
            <ResponsiveContainer width="100%" height={195}>
              <BarChart data={shotZoneData} layout="vertical" barSize={11}>
                <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--faint)' }} axisLine={false} tickLine={false} unit="%" domain={[0, 80]} />
                <YAxis dataKey="zone" type="category" tick={{ fontSize: 10, fill: 'var(--faint)' }} axisLine={false} tickLine={false} width={75} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, color: 'var(--text)' }} formatter={(val) => [`${val}%`, 'FG%']} />
                <Bar dataKey="pct" radius={[0, 2, 2, 0]} name="FG%">
                  {shotZoneData.map((entry, i) => (
                    <Cell key={i} fill={entry.pct >= 50 ? 'var(--green)' : entry.pct >= 40 ? 'var(--amber)' : 'var(--red)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              {[{ c: 'var(--green)', l: '≥50%' }, { c: 'var(--amber)', l: '40–49%' }, { c: 'var(--red)', l: '<40%' }].map(i => (
                <div key={i.l} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm" style={{ background: i.c }} />
                  <span className="text-[11px]" style={{ color: 'var(--faint)' }}>{i.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tendencies / Strengths / Weaknesses */}
        <div className="grid lg:grid-cols-3 gap-4">
          {[
            { title: 'Tendencies', items: player.tendencies, accent: 'var(--amber)' },
            { title: 'Strengths', items: player.strengths, accent: 'var(--green)' },
            { title: 'Weaknesses', items: player.weaknesses, accent: 'var(--red)' },
          ].map(section => (
            <div key={section.title} className="border rounded p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-[9px] font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--faint)' }}>{section.title}</p>
              <ul className="flex flex-col gap-2.5">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[10px] font-black mt-0.5 flex-shrink-0" style={{ color: section.accent }}>
                      {section.title === 'Tendencies' ? `${i + 1}.` : '—'}
                    </span>
                    <span className="text-[12px] leading-relaxed" style={{ color: 'var(--muted)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Game Log */}
        <div className="border rounded overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface2)' }}>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--faint)' }}>Game Log</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                  {['Date', 'OPP', 'MIN', 'PTS', 'REB', 'AST', 'STL', 'BLK', 'FG', '3PT', 'FT', '+/-'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-[9px] font-bold tracking-widest uppercase whitespace-nowrap" style={{ color: 'var(--faint)', background: 'var(--surface)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {player.gameLog.map((game, i) => (
                  <tr
                    key={i}
                    className="border-b"
                    style={{ borderColor: 'var(--border)', background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface2)' }}
                  >
                    <td className="px-4 py-3 text-[11px] whitespace-nowrap tabular" style={{ color: 'var(--faint)' }}>{game.date}</td>
                    <td className="px-4 py-3 text-xs font-bold whitespace-nowrap" style={{ color: 'var(--text)' }}>{game.opponent}</td>
                    <td className="px-4 py-3 text-xs tabular" style={{ color: 'var(--faint)' }}>{game.min}</td>
                    <td className="px-4 py-3 text-sm font-black tabular" style={{ color: 'var(--text)' }}>{game.pts}</td>
                    <td className="px-4 py-3 text-xs font-semibold tabular" style={{ color: 'var(--muted)' }}>{game.reb}</td>
                    <td className="px-4 py-3 text-xs font-semibold tabular" style={{ color: 'var(--muted)' }}>{game.ast}</td>
                    <td className="px-4 py-3 text-xs tabular" style={{ color: 'var(--faint)' }}>{game.stl}</td>
                    <td className="px-4 py-3 text-xs tabular" style={{ color: 'var(--faint)' }}>{game.blk}</td>
                    <td className="px-4 py-3 text-xs tabular" style={{ color: 'var(--faint)' }}>{game.fg}</td>
                    <td className="px-4 py-3 text-xs tabular" style={{ color: 'var(--faint)' }}>{game.fg3}</td>
                    <td className="px-4 py-3 text-xs tabular" style={{ color: 'var(--faint)' }}>{game.ft}</td>
                    <td
                      className="px-4 py-3 text-xs font-black tabular"
                      style={{ color: game.plusMinus > 0 ? 'var(--green)' : game.plusMinus < 0 ? 'var(--red)' : 'var(--faint)' }}
                    >
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

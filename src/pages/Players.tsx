import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { players } from '../data/mockData';

const COLS = ['PTS', 'REB', 'AST', 'SPG', 'FG%', '3P%', '+/-'];

function PlayerRow({ player, index }: { player: typeof players[0]; index: number }) {
  const vals = [
    player.stats.ppg,
    player.stats.rpg,
    player.stats.apg,
    player.stats.spg,
    `${player.stats.fg}%`,
    `${player.stats.fg3}%`,
    `+${player.stats.plusMinus}`,
  ];

  return (
    <Link
      to={`/players/${player.id}`}
      className="group flex items-center border-b transition-colors"
      style={{
        borderColor: 'var(--border)',
        background: index % 2 === 0 ? 'var(--surface)' : 'var(--surface2)',
      }}
    >
      {/* Player info */}
      <div className="flex items-center gap-3 px-4 py-3.5 flex-1 min-w-0">
        <span className="text-[11px] font-black tabular w-6 text-right flex-shrink-0" style={{ color: 'var(--faint)' }}>
          {player.number}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold group-hover:opacity-80 transition-opacity" style={{ color: 'var(--text)' }}>
              {player.name}
            </span>
            <span className="hidden sm:block text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded-sm" style={{ background: 'var(--surface2)', color: 'var(--faint)' }}>
              {player.position}
            </span>
          </div>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--faint)' }}>
            {player.height} · {player.weight}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="hidden sm:flex items-center">
        {vals.map((v, i) => (
          <span
            key={i}
            className="text-sm font-bold tabular text-right w-12 px-2 py-3.5"
            style={{ color: i === 0 ? 'var(--text)' : 'var(--muted)' }}
          >
            {v}
          </span>
        ))}
      </div>

      {/* Trend */}
      <div className="px-4 py-3.5 flex-shrink-0">
        <span
          className="text-xs font-black"
          style={{
            color: player.trend === 'up' ? 'var(--green)' : player.trend === 'down' ? 'var(--red)' : 'var(--faint)',
          }}
        >
          {player.trend === 'up' ? '▲' : player.trend === 'down' ? '▼' : '—'}
        </span>
      </div>

      <ChevronRight size={13} className="mr-4 flex-shrink-0 opacity-30 group-hover:opacity-60 transition-opacity" style={{ color: 'var(--muted)' }} />
    </Link>
  );
}

function TeamTable({ title, teamPlayers, accent }: { title: string; teamPlayers: typeof players; accent: string }) {
  return (
    <div className="border rounded overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      {/* Team header */}
      <div className="px-4 py-3 border-b flex items-center gap-3" style={{ borderColor: 'var(--border)', background: 'var(--surface2)' }}>
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: accent }} />
        <span className="text-xs font-black tracking-widest uppercase" style={{ color: 'var(--text)' }}>{title}</span>
        <span className="text-[10px] tabular ml-auto" style={{ color: 'var(--faint)' }}>{teamPlayers.length} players</span>
      </div>

      {/* Column headers */}
      <div
        className="flex items-center border-b px-4 py-2"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <div className="flex-1">
          <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: 'var(--faint)' }}>Player</span>
        </div>
        <div className="hidden sm:flex items-center">
          {COLS.map(c => (
            <span key={c} className="text-[9px] font-bold tracking-widest uppercase text-right w-12 px-2" style={{ color: 'var(--faint)' }}>{c}</span>
          ))}
        </div>
        <div className="w-12" />
      </div>

      {teamPlayers.map((player, i) => (
        <PlayerRow key={player.id} player={player} index={i} />
      ))}
    </div>
  );
}

export default function Players() {
  const lak = players.filter(p => p.team === 'LAK');
  const riv = players.filter(p => p.team === 'RIV');

  return (
    <div className="min-h-full">
      <header
        className="sticky top-0 z-10 border-b px-6 h-14 flex items-center justify-between"
        style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
      >
        <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Player Analytics</span>
        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--faint)' }}>
          {players.length} players · Last game
        </span>
      </header>

      <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">

        {/* Game leaders */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Top Scorer',    name: 'Marcus Webb',   val: '31', unit: 'PTS', accent: '#6b7280' },
            { label: 'Top Assists',   name: 'Antoine Rivers', val: '13', unit: 'AST', accent: 'var(--amber)' },
            { label: 'Top Rebounder', name: 'Jordan Hayes',  val: '14', unit: 'REB', accent: '#6b7280' },
          ].map(item => (
            <div key={item.label} className="border rounded p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-[9px] font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--faint)' }}>{item.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text)' }}>{item.name}</p>
                <p className="text-2xl font-black tabular leading-none" style={{ color: item.accent }}>
                  {item.val}<span className="text-xs font-bold ml-0.5" style={{ color: 'var(--faint)' }}>{item.unit}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <TeamTable title="Lakeside Wolves" teamPlayers={lak} accent="#9098a9" />
        <TeamTable title="Riverside Raptors" teamPlayers={riv} accent="var(--amber)" />
      </div>
    </div>
  );
}

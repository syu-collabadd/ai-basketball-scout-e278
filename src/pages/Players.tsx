import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, ChevronRight, Users } from 'lucide-react';
import { players } from '../data/mockData';
import clsx from 'clsx';

const trendIcon = {
  up: <TrendingUp size={12} className="text-emerald-400" />,
  down: <TrendingDown size={12} className="text-red-400" />,
  stable: <Minus size={12} className="text-slate-500" />,
};

export default function Players() {
  const lak = players.filter(p => p.team === 'LAK');
  const riv = players.filter(p => p.team === 'RIV');

  function PlayerRow({ player }: { player: typeof players[0] }) {
    return (
      <Link
        to={`/players/${player.id}`}
        className="group flex items-center gap-4 px-4 py-3.5 hover:bg-[#141929] transition-all rounded-xl border border-transparent hover:border-[#2a3555]"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
          style={{ background: `${player.accentColor}22`, color: player.accentColor, border: `1px solid ${player.accentColor}44` }}
        >
          {player.photoInitials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">{player.name}</span>
            <span className="text-xs text-slate-600">#{player.number}</span>
          </div>
          <p className="text-xs text-slate-500">{player.position} · {player.height} · {player.weight}</p>
        </div>

        <div className="hidden sm:grid grid-cols-5 gap-6 text-center">
          {[
            { label: 'PTS', val: player.stats.ppg },
            { label: 'REB', val: player.stats.rpg },
            { label: 'AST', val: player.stats.apg },
            { label: 'FG%', val: `${player.stats.fg}%` },
            { label: '+/-', val: `+${player.stats.plusMinus}` },
          ].map(s => (
            <div key={s.label}>
              <p className="text-sm font-bold text-slate-100">{s.val}</p>
              <p className="text-[10px] text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {trendIcon[player.trend]}
          <span className={clsx('text-xs',
            player.trend === 'up' && 'text-emerald-400',
            player.trend === 'down' && 'text-red-400',
            player.trend === 'stable' && 'text-slate-500',
          )}>
            {player.trend === 'up' ? 'Hot' : player.trend === 'down' ? 'Cold' : 'Avg'}
          </span>
        </div>

        <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
      </Link>
    );
  }

  function TeamSection({ title, teamPlayers, color }: { title: string; teamPlayers: typeof players; color: string }) {
    return (
      <div className="bg-[#0d1017] border border-[#1a2035] rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[#1a2035] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: color }} />
            <h2 className="text-sm font-semibold text-slate-200">{title}</h2>
            <span className="text-xs text-slate-500 bg-[#141929] px-1.5 py-0.5 rounded">{teamPlayers.length} players</span>
          </div>
          {/* Column headers */}
          <div className="hidden sm:flex items-center gap-6 pr-20">
            {['PTS', 'REB', 'AST', 'FG%', '+/-'].map(h => (
              <span key={h} className="text-[10px] font-medium text-slate-600 uppercase tracking-wider w-8 text-center">{h}</span>
            ))}
          </div>
        </div>
        <div className="p-2 flex flex-col gap-0.5">
          {teamPlayers.map(player => (
            <PlayerRow key={player.id} player={player} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 bg-[#0a0c10]/90 backdrop-blur border-b border-[#1a2035] px-6 h-14 flex items-center gap-2">
        <Users size={16} className="text-slate-400" />
        <h1 className="text-sm font-semibold text-slate-100">Player Analytics</h1>
        <span className="text-xs text-slate-500">· {players.length} players · Last game</span>
      </header>

      <div className="p-6 max-w-5xl mx-auto flex flex-col gap-5">
        {/* League-wide stat leaders summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Top Scorer', name: 'Marcus Webb', val: '31 PTS', sub: 'LAK · SG', color: '#3b82f6' },
            { label: 'Top Assists', name: 'Antoine Rivers', val: '13 AST', sub: 'RIV · PG', color: '#f97316' },
            { label: 'Top Rebounder', name: 'Jordan Hayes', val: '14 REB', sub: 'LAK · C', color: '#3b82f6' },
          ].map(item => (
            <div key={item.label} className="bg-[#0d1017] border border-[#1a2035] rounded-xl p-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">{item.label}</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{ background: `${item.color}22`, color: item.color, border: `1px solid ${item.color}44` }}>
                  {item.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-100">{item.name}</p>
                  <p className="text-[10px] text-slate-500">{item.sub}</p>
                </div>
                <span className="ml-auto text-sm font-bold" style={{ color: item.color }}>{item.val}</span>
              </div>
            </div>
          ))}
        </div>

        <TeamSection title="Lakeside Wolves" teamPlayers={lak} color="#3b82f6" />
        <TeamSection title="Riverside Raptors" teamPlayers={riv} color="#f97316" />
      </div>
    </div>
  );
}

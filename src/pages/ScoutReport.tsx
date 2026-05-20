import { useRef, useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';
import { Download, Loader2 } from 'lucide-react';
import InsightCard from '../components/InsightCard';
import { aiInsights, lineups, teams, gameResult, players } from '../data/mockData';

const radarData = [
  { subject: 'Offense',    LAK: 72, RIV: 84 },
  { subject: 'Defense',    LAK: 68, RIV: 76 },
  { subject: 'Rebounding', LAK: 62, RIV: 71 },
  { subject: 'Transition', LAK: 58, RIV: 82 },
  { subject: '3-Point',    LAK: 65, RIV: 74 },
  { subject: 'Playmaking', LAK: 74, RIV: 78 },
];

const tacticalActions = [
  {
    priority: 'P1',
    color: 'var(--red)',
    title: 'Counter Rivers\' Transition Push',
    steps: [
      'Assign designated sprint-back player after every shot attempt',
      'Force Rivers wide off live-ball rebounds — deny the middle lane',
      'Set early back-line defense before ball crosses half-court',
    ],
  },
  {
    priority: 'P2',
    color: 'var(--amber)',
    title: 'Attack Pick-and-Roll with Blitz Coverage',
    steps: [
      'Replace drop coverage with blitz on Rivers / Grant ball screens',
      'Rotate Webb to ICE position early to force sideline action',
      'Hayes rotates to protect rim on stunt-and-recover actions',
    ],
  },
  {
    priority: 'P3',
    color: 'var(--green)',
    title: 'Maximize Webb–Hayes Two-Man Game',
    steps: [
      'Run HORNS action to initiate Webb–Hayes PnR in first 8 seconds',
      'Webb reads middle vs. roll based on Riverside\'s coverage shell',
      'Set weak-side Mercer as safety valve for skip passes',
    ],
  },
];

export default function ScoutReport() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    const { default: html2canvas } = await import('html2canvas');
    const { jsPDF } = await import('jspdf');
    const el = reportRef.current;
    if (!el) { setExporting(false); return; }
    try {
      const canvas = await html2canvas(el, { backgroundColor: '#0c0d0f', scale: 1.5, useCORS: true, logging: false });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: [canvas.width / 1.5, canvas.height / 1.5] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 1.5, canvas.height / 1.5);
      pdf.save(`ScoutReport-${teams.home.abbreviation}v${teams.away.abbreviation}-${gameResult.date}.pdf`);
    } finally {
      setExporting(false);
    }
  }

  const criticalCount = aiInsights.filter(i => i.severity === 'critical').length;
  const positiveCount = aiInsights.filter(i => i.severity === 'positive').length;

  return (
    <div className="min-h-full">
      {/* Header */}
      <header
        className="sticky top-0 z-10 border-b px-6 h-14 flex items-center justify-between"
        style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
      >
        <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Scouting Report</span>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 px-4 py-2 rounded text-xs font-bold tracking-wide transition-opacity disabled:opacity-50 hover:opacity-80"
          style={{ background: 'var(--amber)', color: '#000' }}
        >
          {exporting ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
          {exporting ? 'Exporting...' : 'Export PDF'}
        </button>
      </header>

      <div ref={reportRef} className="p-6 max-w-5xl mx-auto flex flex-col gap-8">

        {/* Report masthead */}
        <div
          className="border rounded p-6"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderTop: '2px solid var(--amber)' }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[9px] font-black tracking-widest uppercase mb-2" style={{ color: 'var(--amber)' }}>
                AI Scouting Report · Confidential
              </p>
              <h1 className="text-2xl font-black leading-tight" style={{ color: 'var(--text)' }}>
                {teams.home.name}
                <span className="font-light mx-2" style={{ color: 'var(--faint)' }}>vs</span>
                {teams.away.name}
              </h1>
              <p className="text-xs mt-1" style={{ color: 'var(--faint)' }}>
                {gameResult.date} · {gameResult.venue} · {gameResult.attendance.toLocaleString()} attendance
              </p>
            </div>
            <div className="text-right">
              <p className="text-5xl font-black tabular leading-none" style={{ color: 'var(--text)' }}>
                {gameResult.homeScore}
                <span className="text-2xl font-light mx-2" style={{ color: 'var(--faint)' }}>—</span>
                <span style={{ color: 'var(--amber)' }}>{gameResult.awayScore}</span>
              </p>
              <p className="text-[10px] font-bold tracking-widest uppercase mt-1" style={{ color: 'var(--faint)' }}>FINAL</p>
            </div>
          </div>

          <div className="flex gap-6 mt-5 pt-4 border-t flex-wrap" style={{ borderColor: 'var(--border)' }}>
            <div>
              <p className="text-2xl font-black tabular" style={{ color: 'var(--red)' }}>{criticalCount}</p>
              <p className="text-[9px] font-bold tracking-widest uppercase" style={{ color: 'var(--faint)' }}>Critical Issues</p>
            </div>
            <div>
              <p className="text-2xl font-black tabular" style={{ color: 'var(--green)' }}>{positiveCount}</p>
              <p className="text-[9px] font-bold tracking-widest uppercase" style={{ color: 'var(--faint)' }}>Edges Found</p>
            </div>
            <div>
              <p className="text-2xl font-black tabular" style={{ color: 'var(--text)' }}>{players.length}</p>
              <p className="text-[9px] font-bold tracking-widest uppercase" style={{ color: 'var(--faint)' }}>Players Analyzed</p>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--faint)' }}>
            AI Insights <span className="ml-2" style={{ color: 'var(--amber)' }}>{aiInsights.length}</span>
          </p>
          <div className="flex flex-col gap-3">
            {aiInsights.map((insight, i) => (
              <InsightCard key={i} insight={insight} />
            ))}
          </div>
        </div>

        {/* Radar + Lineup */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Radar */}
          <div className="border rounded p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--faint)' }}>Team Profile</p>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'var(--faint)' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Lakeside" dataKey="LAK" stroke="var(--muted)" fill="var(--muted)" fillOpacity={0.1} strokeWidth={1.5} />
                <Radar name="Riverside" dataKey="RIV" stroke="var(--amber)" fill="var(--amber)" fillOpacity={0.1} strokeWidth={1.5} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, color: 'var(--text)' }} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-1">
              <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 rounded" style={{ background: 'var(--muted)' }} /><span className="text-[11px]" style={{ color: 'var(--faint)' }}>Lakeside</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 rounded" style={{ background: 'var(--amber)' }} /><span className="text-[11px]" style={{ color: 'var(--faint)' }}>Riverside</span></div>
            </div>
          </div>

          {/* Lineup efficiency */}
          <div className="border rounded p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--faint)' }}>
              Lineup Net Rating · LAK
            </p>
            <div className="flex flex-col gap-3">
              {lineups.map((lineup, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] truncate mb-1" style={{ color: 'var(--faint)' }}>{lineup.players.join(' · ')}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max(0, Math.min(100, (lineup.netRating + 15) * 4))}%`,
                            background: lineup.netRating > 0 ? 'var(--green)' : 'var(--red)',
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-black tabular w-10 text-right flex-shrink-0"
                        style={{ color: lineup.netRating > 0 ? 'var(--green)' : 'var(--red)' }}
                      >
                        {lineup.netRating > 0 ? '+' : ''}{lineup.netRating}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] w-12 text-right flex-shrink-0" style={{ color: 'var(--faint)' }}>
                    {lineup.minutes}m
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[9px] mt-3" style={{ color: 'var(--faint)', opacity: 0.6 }}>Net rating per 100 possessions</p>
          </div>
        </div>

        {/* Tactical Action Plan */}
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--faint)' }}>
            Tactical Action Plan · Next Game
          </p>
          <div className="flex flex-col gap-3">
            {tacticalActions.map((action, i) => (
              <div
                key={i}
                className="border rounded p-4"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderLeft: `3px solid ${action.color}` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[9px] font-black tracking-widest" style={{ color: action.color }}>{action.priority}</span>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>{action.title}</h3>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {action.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="text-[10px] flex-shrink-0 mt-0.5" style={{ color: 'var(--faint)' }}>→</span>
                      <span className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Matchups */}
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--faint)' }}>Key Matchups</p>
          <div className="grid lg:grid-cols-2 gap-3">
            {[
              { lak: players[1], riv: players[4], analysis: 'Battle of point guards. Rivers\' pace vs. Cole\'s half-court craft. Cole must deny the middle on drives and force Rivers into a right-hand floater. Rivers is 3-for-12 on contested floaters this season.' },
              { lak: players[0], riv: players[3], analysis: 'Wing matchup of the game. Webb has a 2.4-inch height edge; Grant has superior lateral quickness. Switching exposes Grant on Webb post-ups. Recommend ICE positioning on Grant.' },
            ].map(({ lak, riv, analysis }, i) => (
              <div key={i} className="border rounded p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-black" style={{ color: 'var(--text)' }}>{lak.name}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm" style={{ background: 'var(--surface2)', color: 'var(--faint)' }}>vs</span>
                  <span className="text-xs font-black" style={{ color: 'var(--amber)' }}>{riv.name}</span>
                </div>
                <p className="text-[12px] leading-relaxed" style={{ color: 'var(--muted)' }}>{analysis}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--faint)', opacity: 0.5 }}>
            Generated by ScoutAI · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-[10px]" style={{ color: 'var(--faint)', opacity: 0.5 }}>Confidential — Internal Use Only</p>
        </div>
      </div>
    </div>
  );
}

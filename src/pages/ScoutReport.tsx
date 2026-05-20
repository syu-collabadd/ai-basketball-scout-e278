import { useRef, useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  Tooltip
} from 'recharts';
import { FileText, Download, Loader2, Zap, Shield, Target, Activity, TrendingUp } from 'lucide-react';
import InsightCard from '../components/InsightCard';
import { aiInsights, lineups, teams, gameResult, players } from '../data/mockData';
import clsx from 'clsx';

const radarData = [
  { subject: 'Offense', LAK: 72, RIV: 84 },
  { subject: 'Defense', LAK: 68, RIV: 76 },
  { subject: 'Rebounding', LAK: 62, RIV: 71 },
  { subject: 'Transition', LAK: 58, RIV: 82 },
  { subject: 'Three-Point', LAK: 65, RIV: 74 },
  { subject: 'Playmaking', LAK: 74, RIV: 78 },
];

const tacticalActions = [
  {
    title: 'Counter Rivers\' Transition Push',
    priority: 'P1',
    color: 'red',
    steps: [
      'Assign designated sprint-back player after every shot attempt',
      'Force Rivers wide off live-ball rebounds — deny the middle lane',
      'Set early back-line defense before the ball crosses half-court',
    ],
  },
  {
    title: 'Attack Pick-and-Roll with Blitz Coverage',
    priority: 'P2',
    color: 'amber',
    steps: [
      'Replace drop coverage with blitz on Rivers / Grant ball screens',
      'Rotate Webb to ICE position early to force sideline action',
      'Hayes rotates to protect rim on stunt-and-recover actions',
    ],
  },
  {
    title: 'Maximize Webb–Hayes Two-Man Game',
    priority: 'P3',
    color: 'emerald',
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
      const canvas = await html2canvas(el, {
        backgroundColor: '#0a0c10',
        scale: 1.5,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: [canvas.width / 1.5, canvas.height / 1.5] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 1.5, canvas.height / 1.5);
      pdf.save(`ScoutReport-${teams.home.abbreviation}-vs-${teams.away.abbreviation}-${gameResult.date}.pdf`);
    } finally {
      setExporting(false);
    }
  }

  const criticalCount = aiInsights.filter(i => i.severity === 'critical').length;
  const positiveCount = aiInsights.filter(i => i.severity === 'positive').length;

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0a0c10]/90 backdrop-blur border-b border-[#1a2035] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-slate-400" />
          <h1 className="text-sm font-semibold text-slate-100">Scouting Report</h1>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 disabled:opacity-60 transition-all"
        >
          {exporting ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
          {exporting ? 'Exporting...' : 'Export PDF'}
        </button>
      </header>

      <div ref={reportRef} className="p-6 max-w-5xl mx-auto flex flex-col gap-6">

        {/* Report Header */}
        <div className="bg-gradient-to-br from-[#0d1017] to-[#111827] border border-[#1a2035] rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={14} className="text-blue-400" />
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">AI Scouting Report</span>
              </div>
              <h2 className="text-xl font-black text-slate-100 tracking-tight">
                {teams.home.name} <span className="text-slate-600 font-light">vs</span> {teams.away.name}
              </h2>
              <p className="text-sm text-slate-500 mt-1">{gameResult.date} · {gameResult.venue} · {gameResult.attendance.toLocaleString()} attendance</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-3xl font-black text-slate-100">
                <span className="text-blue-300">{gameResult.homeScore}</span>
                <span className="text-slate-600 mx-2 font-light">–</span>
                <span className="text-orange-300">{gameResult.awayScore}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Final</p>
            </div>
          </div>

          <div className="flex gap-3 mt-4 flex-wrap">
            <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg">
              <Shield size={12} className="text-red-400" />
              <span className="text-xs text-red-400 font-medium">{criticalCount} Critical Issues</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
              <TrendingUp size={12} className="text-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium">{positiveCount} Advantages Identified</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg">
              <Activity size={12} className="text-blue-400" />
              <span className="text-xs text-blue-400 font-medium">{players.length} Players Analyzed</span>
            </div>
          </div>
        </div>

        {/* All AI Insights */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={15} className="text-blue-400" />
            <h2 className="text-sm font-semibold text-slate-200">AI Coaching Insights</h2>
            <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded-full">{aiInsights.length} insights</span>
          </div>
          <div className="flex flex-col gap-3">
            {aiInsights.map((insight, i) => (
              <InsightCard key={i} insight={insight} />
            ))}
          </div>
        </div>

        {/* Team Radar */}
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-[#0d1017] border border-[#1a2035] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Team Profile Comparison</h3>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1a2035" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Lakeside" dataKey="LAK" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Riverside" dataKey="RIV" stroke="#f97316" fill="#f97316" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip
                  contentStyle={{ background: '#0d1017', border: '1px solid #1a2035', borderRadius: 8, fontSize: 12 }}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 justify-center">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-blue-500 rounded" /><span className="text-xs text-slate-500">Lakeside</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-orange-500 rounded" /><span className="text-xs text-slate-500">Riverside</span></div>
            </div>
          </div>

          {/* Lineup Efficiency */}
          <div className="bg-[#0d1017] border border-[#1a2035] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={14} className="text-slate-400" />
              <h3 className="text-sm font-semibold text-slate-200">Lineup Efficiency (LAK)</h3>
            </div>
            <div className="flex flex-col gap-2">
              {lineups.map((lineup, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-slate-500 truncate">{lineup.players.join(' · ')}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex-1 h-1.5 bg-[#1a2035] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max(0, Math.min(100, (lineup.netRating + 15) * 4))}%`,
                            background: lineup.netRating > 0 ? '#10b981' : '#ef4444',
                          }}
                        />
                      </div>
                      <span className={clsx('text-xs font-bold w-12 text-right', lineup.netRating > 0 ? 'text-emerald-400' : 'text-red-400')}>
                        {lineup.netRating > 0 ? '+' : ''}{lineup.netRating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 w-16">
                    <p className="text-[10px] text-slate-500">{lineup.minutes} min</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-600 mt-3">Net Rating per 100 possessions</p>
          </div>
        </div>

        {/* Tactical Action Plan */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target size={15} className="text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-200">AI Tactical Action Plan</h2>
            <span className="text-xs text-slate-500">· Next game preparation</span>
          </div>
          <div className="flex flex-col gap-3">
            {tacticalActions.map((action, i) => (
              <div
                key={i}
                className={clsx(
                  'border rounded-xl p-4',
                  action.color === 'red' && 'bg-red-950/10 border-red-500/20',
                  action.color === 'amber' && 'bg-amber-950/10 border-amber-500/20',
                  action.color === 'emerald' && 'bg-emerald-950/10 border-emerald-500/20',
                )}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={clsx(
                    'text-[10px] font-black px-2 py-1 rounded',
                    action.color === 'red' && 'bg-red-500/20 text-red-400',
                    action.color === 'amber' && 'bg-amber-500/20 text-amber-400',
                    action.color === 'emerald' && 'bg-emerald-500/20 text-emerald-400',
                  )}>
                    {action.priority}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-100">{action.title}</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {action.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-slate-600 text-xs mt-0.5 flex-shrink-0">→</span>
                      <span className="text-xs text-slate-400 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Key Matchups */}
        <div>
          <h2 className="text-sm font-semibold text-slate-200 mb-4">Key Matchup Analysis</h2>
          <div className="grid lg:grid-cols-2 gap-3">
            {[
              { lak: players[1], riv: players[4], focus: 'Battle of the point guards — Rivers\' pace vs. Cole\'s half-court craft. Cole must deny middle lane on Rivers\' drives and force him into a right-hand floater. Rivers is 3-for-12 on contested floaters this season.' },
              { lak: players[0], riv: players[3], focus: 'Wing matchup of the game. Webb has a 2.4-inch height advantage; Grant has superior lateral quickness. Switching will expose Grant on Webb\'s post-ups. Recommend keeping Grant on Webb in ICE position.' },
            ].map(({ lak, riv, focus }, i) => (
              <div key={i} className="bg-[#0d1017] border border-[#1a2035] rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full text-[10px] font-bold flex items-center justify-center"
                      style={{ background: `${lak.accentColor}22`, color: lak.accentColor, border: `1px solid ${lak.accentColor}44` }}>
                      {lak.photoInitials}
                    </div>
                    <span className="text-xs font-semibold text-slate-200">{lak.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-600 bg-[#1a2035] px-1.5 py-0.5 rounded">vs</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full text-[10px] font-bold flex items-center justify-center"
                      style={{ background: `${riv.accentColor}22`, color: riv.accentColor, border: `1px solid ${riv.accentColor}44` }}>
                      {riv.photoInitials}
                    </div>
                    <span className="text-xs font-semibold text-slate-200">{riv.name}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{focus}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Report footer */}
        <div className="border-t border-[#1a2035] pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-blue-400" />
            <span className="text-xs text-slate-600">Generated by ScoutAI · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <span className="text-xs text-slate-600">Confidential — Internal Use Only</span>
        </div>
      </div>
    </div>
  );
}


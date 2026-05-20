import clsx from 'clsx';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import type { AIInsight } from '../data/mockData';

const severityConfig = {
  critical: {
    icon: XCircle,
    border: 'border-red-500/30',
    bg: 'bg-red-950/20',
    badge: 'bg-red-500/20 text-red-400 border border-red-500/30',
    icon_color: 'text-red-400',
    label: 'CRITICAL',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-amber-500/30',
    bg: 'bg-amber-950/20',
    badge: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    icon_color: 'text-amber-400',
    label: 'WARNING',
  },
  info: {
    icon: Info,
    border: 'border-blue-500/30',
    bg: 'bg-blue-950/20',
    badge: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    icon_color: 'text-blue-400',
    label: 'INSIGHT',
  },
  positive: {
    icon: CheckCircle,
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-950/20',
    badge: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    icon_color: 'text-emerald-400',
    label: 'ADVANTAGE',
  },
};

export default function InsightCard({ insight, compact }: { insight: AIInsight; compact?: boolean }) {
  const config = severityConfig[insight.severity];
  const Icon = config.icon;

  return (
    <div className={clsx(
      'border rounded-xl p-4 flex flex-col gap-3',
      config.border,
      config.bg
    )}>
      <div className="flex items-start gap-3">
        <Icon size={18} className={clsx('flex-shrink-0 mt-0.5', config.icon_color)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={clsx('text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded', config.badge)}>
              {config.label}
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">{insight.category}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-100 leading-snug">{insight.title}</h3>
          {!compact && (
            <p className="text-xs text-slate-400 leading-relaxed mt-1.5">{insight.body}</p>
          )}
        </div>
      </div>
      {!compact && (
        <div className="flex flex-wrap gap-1.5">
          {insight.tags.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#1a2035] text-slate-400 border border-[#2a3555]">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

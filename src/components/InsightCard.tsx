import type { AIInsight } from '../data/mockData';

const severityConfig = {
  critical: { label: 'CRITICAL', dot: 'var(--red)', line: '#ef444430' },
  warning:  { label: 'WARNING',  dot: '#f59e0b',   line: '#f59e0b30' },
  info:     { label: 'INSIGHT',  dot: '#60a5fa',   line: '#60a5fa20' },
  positive: { label: 'EDGE',     dot: 'var(--green)', line: '#22c55e25' },
};

export default function InsightCard({ insight, compact }: { insight: AIInsight; compact?: boolean }) {
  const cfg = severityConfig[insight.severity];

  return (
    <div
      className="rounded border p-4"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderLeft: `3px solid ${cfg.dot}`,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-[9px] font-black tracking-widest"
              style={{ color: cfg.dot }}
            >
              {cfg.label}
            </span>
            <span
              className="text-[9px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--faint)' }}
            >
              {insight.category}
            </span>
          </div>
          <h3
            className="text-sm font-semibold leading-snug"
            style={{ color: 'var(--text)' }}
          >
            {insight.title}
          </h3>
          {!compact && (
            <p
              className="text-xs leading-relaxed mt-2"
              style={{ color: 'var(--muted)' }}
            >
              {insight.body}
            </p>
          )}
        </div>
      </div>
      {!compact && insight.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
          {insight.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded-sm"
              style={{ background: 'var(--surface2)', color: 'var(--faint)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export default function StatCard({ label, value, subtext, trend, className }: StatCardProps) {
  return (
    <div
      className={`border p-4 flex flex-col gap-1 rounded ${className ?? ''}`}
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <p
        className="text-[10px] font-semibold tracking-widest uppercase"
        style={{ color: 'var(--faint)' }}
      >
        {label}
      </p>
      <div className="flex items-baseline gap-2 mt-0.5">
        <span className="text-2xl font-bold tabular leading-none" style={{ color: 'var(--text)' }}>
          {value}
        </span>
        {trend && (
          <span
            className="text-[10px] font-bold"
            style={{ color: trend === 'up' ? 'var(--red)' : trend === 'down' ? 'var(--green)' : 'var(--faint)' }}
          >
            {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—'}
          </span>
        )}
      </div>
      {subtext && (
        <p className="text-[11px] mt-0.5" style={{ color: 'var(--faint)' }}>
          {subtext}
        </p>
      )}
    </div>
  );
}

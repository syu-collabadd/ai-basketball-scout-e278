import clsx from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  accent?: boolean;
  className?: string;
}

export default function StatCard({ label, value, subtext, trend, accent, className }: StatCardProps) {
  return (
    <div className={clsx(
      'bg-[#0d1017] border border-[#1a2035] rounded-xl p-4 flex flex-col gap-1',
      accent && 'border-blue-500/30 bg-blue-950/20',
      className
    )}>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <div className="flex items-end gap-2">
        <span className={clsx(
          'text-2xl font-bold tracking-tight',
          accent ? 'text-blue-300' : 'text-slate-100'
        )}>
          {value}
        </span>
        {trend && (
          <span className={clsx(
            'flex items-center gap-0.5 text-xs font-medium mb-0.5',
            trend === 'up' && 'text-emerald-400',
            trend === 'down' && 'text-red-400',
            trend === 'neutral' && 'text-slate-500',
          )}>
            {trend === 'up' && <TrendingUp size={12} />}
            {trend === 'down' && <TrendingDown size={12} />}
            {trend === 'neutral' && <Minus size={12} />}
          </span>
        )}
      </div>
      {subtext && <p className="text-xs text-slate-500">{subtext}</p>}
    </div>
  );
}

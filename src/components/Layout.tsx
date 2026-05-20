import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Users, FileText, Zap } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { to: '/', icon: BarChart3, label: 'Dashboard' },
  { to: '/players', icon: Users, label: 'Players' },
  { to: '/report', icon: FileText, label: 'Scout Report' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#0a0c10] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-16 lg:w-56 flex flex-col bg-[#0d1017] border-r border-[#1a2035] flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 px-3 lg:px-4 h-14 border-b border-[#1a2035]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <span className="hidden lg:block text-white font-semibold text-sm tracking-wide">ScoutAI</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={clsx(
                  'flex items-center gap-3 px-2 lg:px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  active
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-[#141929]'
                )}
              >
                <Icon size={18} className="flex-shrink-0" />
                <span className="hidden lg:block">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-2 lg:px-3 py-4 border-t border-[#1a2035]">
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-slate-300">CM</span>
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-medium text-slate-300 leading-none">Coach Mike</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Head Coach</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto scrollbar-thin">
        {children}
      </main>
    </div>
  );
}

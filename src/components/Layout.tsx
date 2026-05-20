import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { to: '/', label: 'Dashboard', short: 'DB' },
  { to: '/players', label: 'Players', short: 'PL' },
  { to: '/report', label: 'Scout Report', short: 'SR' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside
        className="w-14 lg:w-52 flex flex-col flex-shrink-0 border-r"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 h-14 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <span
            className="text-xs font-black tracking-widest"
            style={{ color: 'var(--amber)', letterSpacing: '0.15em' }}
          >
            SCOUT
          </span>
          <span
            className="hidden lg:block text-xs font-black tracking-widest"
            style={{ color: 'var(--faint)', letterSpacing: '0.15em' }}
          >
            AI
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 flex flex-col px-2 gap-0.5">
          {navItems.map(({ to, label, short }) => {
            const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold tracking-wide transition-colors duration-100',
                  active
                    ? 'text-white'
                    : 'hover:text-white'
                )}
                style={{
                  background: active ? 'var(--surface2)' : 'transparent',
                  color: active ? 'var(--text)' : 'var(--faint)',
                  borderLeft: active ? '2px solid var(--amber)' : '2px solid transparent',
                }}
              >
                <span className="lg:hidden text-[10px] font-black tracking-widest" style={{ color: active ? 'var(--amber)' : 'inherit' }}>{short}</span>
                <span className="hidden lg:block">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Season label */}
        <div
          className="px-4 py-4 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="hidden lg:block text-[10px] font-semibold tracking-widest" style={{ color: 'var(--faint)' }}>
            SEASON 2025–26
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

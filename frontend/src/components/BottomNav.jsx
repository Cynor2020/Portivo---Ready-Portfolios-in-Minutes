import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Palette, 
  Sparkles,
  Settings
} from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/templates', icon: Palette, label: 'Templates' },
    { path: '/ai-analysis', icon: Sparkles, label: 'AI' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card/95 backdrop-blur-xl border-t border-zinc-800/50 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl
                transition-all duration-200 min-w-[4rem]
                ${
                  isActive
                    ? 'text-white'
                    : 'text-text-secondary active:scale-95'
                }
              `}
            >
              {/* Active background */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-purple-main/20 to-purple-hover/10 rounded-xl" />
              )}
              
              {/* Icon container */}
              <div className={`
                relative flex items-center justify-center
                transition-all duration-200
                ${isActive ? 'scale-110' : ''}
              `}>
                <Icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? 'drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]' : ''}
                />
              </div>
              
              {/* Label */}
              <span className={`
                text-[0.6875rem] font-medium tracking-tight
                ${isActive ? 'font-semibold text-purple-main' : ''}
              `}>
                {item.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute -top-0.5 w-1 h-1 bg-purple-main rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

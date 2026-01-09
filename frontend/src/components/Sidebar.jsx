import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  Palette, 
  Sparkles, 
  LogOut, 
  CreditCard, 
  MessageCircle,
  UserCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ className = '' }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/templates', icon: Palette, label: 'Templates' },
    { path: '/ai-analysis', icon: Sparkles, label: 'AI Analysis' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/my-account', icon: UserCircle, label: 'My Account' },
    { path: '/subscription', icon: CreditCard, label: 'Subscription' },
    { path: '/support', icon: MessageCircle, label: 'Support' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <aside 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-zinc-800/50 flex flex-col z-40 backdrop-blur-xl ${
        className
      }`}
    >

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                group relative flex items-center gap-3 px-3 py-2.5 rounded-lg 
                transition-all duration-200 ease-out
                ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-main/90 to-purple-hover text-white shadow-lg shadow-purple-main/20'
                    : 'text-text-secondary hover:bg-zinc-800/60 hover:text-text-primary'
                }
              `}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
              )}
              
              {/* Icon with animation */}
              <div className={`
                relative flex items-center justify-center
                transition-transform duration-200
                ${
                  isActive 
                    ? 'scale-110' 
                    : 'group-hover:scale-110 group-hover:rotate-3'
                }
              `}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                
                {/* Glow effect on active */}
                {isActive && (
                  <div className="absolute inset-0 blur-md opacity-40 bg-white" />
                )}
              </div>
              
              {/* Label */}
              <span className={`
                text-[0.9375rem] font-medium tracking-tight
                ${isActive ? 'font-semibold' : ''}
              `}>
                {item.label}
              </span>

              {/* Hover gradient overlay */}
              {!isActive && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-main/0 to-purple-hover/0 group-hover:from-purple-main/5 group-hover:to-purple-hover/5 transition-all duration-200" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-t border-zinc-800/50 bg-zinc-900/30">
        <button
          onClick={handleLogout}
          className="
            group relative flex items-center gap-3 px-3 py-2.5 rounded-lg w-full
            text-text-secondary hover:text-red-400 hover:bg-red-950/20
            transition-all duration-200
          "
        >
          <LogOut 
            size={20} 
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6" 
          />
          <span className="text-[0.9375rem] font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;


import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, Settings, Palette, Activity, LogOut, CreditCard, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/templates', icon: Palette, label: 'Templates' },
    { path: '/ai-analysis', icon: Activity, label: 'AI Analysis' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/my-account', icon: User, label: 'My Account' },
    { path: '/subscription', icon: CreditCard, label: 'Subscription' },
    { path: '/support', icon: MessageCircle, label: 'Support' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-zinc-800 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-text-primary">Portivo</h1>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-purple-main text-white'
                  : 'text-text-secondary hover:bg-zinc-800 hover:text-text-primary'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-zinc-800 hover:text-text-primary w-full transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


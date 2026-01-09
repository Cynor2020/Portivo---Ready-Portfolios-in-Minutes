import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onMobileMenuClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    if (onMobileMenuClick) {
      onMobileMenuClick();
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <nav className="bg-card border-b border-zinc-800/50 sticky top-0 z-40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              src="/portivo.png" 
              alt="Portivo Logo" 
              className="h-14 w-auto object-contain"
            />
            
          </div>



          {/* User Menu - Desktop */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-text-primary text-sm font-medium hidden md:block">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={logout}
                className="text-text-secondary hover:text-red-400 p-2 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-text-secondary hover:text-text-primary p-2 rounded-md transition-colors duration-200"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-zinc-800/50">

            <div className="pt-4 pb-3 border-t border-zinc-800/50">
              <div className="flex items-center px-3 justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-text-primary text-sm font-medium">{user?.name}</div>
                    <div className="text-text-secondary text-xs">{user?.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-text-secondary hover:text-red-400 p-2 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
                  aria-label="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar - Full width, fixed/sticky at top */}
      <Navbar onMobileMenuClick={toggleSidebar} />
      
      <div className="relative">
        {/* Desktop Sidebar - Starts below header */}
        <div className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-40">
          <Sidebar />
        </div>

        {/* Mobile Sidebar - Slide in from left */}
        <div
          className={`
            md:hidden fixed top-0 left-0 h-full w-64 z-50
            transform transition-transform duration-300 ease-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-200"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Content Area - Starts to the right of sidebar, below header */}
        <main 
          className="
            md:ml-64 md:mt-16 min-h-screen 
            pb-20 md:pb-0
            transition-all duration-300
          "
        >
          {/* Content Container with proper scrolling */}
          <div className="h-full overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
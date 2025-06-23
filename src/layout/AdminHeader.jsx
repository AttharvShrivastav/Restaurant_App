import React from "react";
import { useSidebar } from "../context/SidebarContext";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton"; // Assuming you have this
import { Menu, X, Search, Bell, User } from "lucide-react";

const AdminHeader = () => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) { // lg breakpoint
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-b border-gray-200 z-30 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between flex-grow px-3 py-3 lg:px-6">
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg dark:border-gray-800 lg:h-11 lg:w-11 lg:border"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={20} />}
          </button>
          <div className="hidden lg:block relative">
            <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                <Search size={20} className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-4 text-sm"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggleButton />
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
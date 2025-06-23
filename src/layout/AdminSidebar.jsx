import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { ShoppingCart, BarChart2, UtensilsCrossed, Settings, Package, X, Menu } from "lucide-react";

// Our navigation items for the restaurant admin
const adminNavItems = [
  { name: 'Manage Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
  { name: 'Analytics', path: '/admin/analytics', icon: <BarChart2 size={20} /> },
  { name: 'Menu Setup', path: '/admin/menu-setup', icon: <UtensilsCrossed size={20} /> },
  { name: 'Category Setup', path: '/admin/category-setup', icon: <Package size={20} /> },
  { name: 'Restaurant Settings', path: '/admin/restaurant-setup', icon: <Settings size={20} /> },
];

const AdminSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        {/* Placeholder for Logo */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {(isExpanded || isHovered || isMobileOpen) ? "Restaurant Admin" : "RA"}
        </h1>
      </div>

      <nav className="flex flex-col flex-1 overflow-y-auto duration-300 ease-linear no-scrollbar">
        <ul className="flex flex-col gap-4">
          {adminNavItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={`menu-item group flex items-center gap-4 p-3 rounded-lg text-gray-500 hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-gray-800 dark:hover:text-brand-500
                  ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}
                  ${isActive(item.path) ? "bg-brand-50 text-brand-500 dark:bg-gray-800" : ""}`}
              >
                {item.icon}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="font-medium">{item.name}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
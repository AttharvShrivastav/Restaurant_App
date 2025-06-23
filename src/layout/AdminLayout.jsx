import React from 'react';
import { Outlet } from "react-router-dom";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { ThemeProvider } from "../context/ThemeContext";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  return (
    <div className="min-h-screen xl:flex bg-gray-50 dark:bg-gray-950">
      <AdminSidebar />

      {/* Backdrop for mobile sidebar */}
      {isMobileOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"></div>}

      <div
        className={`flex-1 transition-all duration-300 ease-in-out 
          ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"}`}
      >
        <AdminHeader />
        <main className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <LayoutContent />
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AdminLayout;
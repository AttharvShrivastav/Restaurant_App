import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-xl font-bold">Admin Panel</div>
        <nav>
          <NavLink to="/admin" end className="block py-2 px-4 text-sm hover:bg-gray-700">Dashboard</NavLink>
          <NavLink to="/admin/restaurant-setup" className="block py-2 px-4 text-sm hover:bg-gray-700">Restaurant Details</NavLink>
          <NavLink to="/admin/menu-setup" className="block py-2 px-4 text-sm hover:bg-gray-700">Menu Setup</NavLink>
          <NavLink to="/admin/category-setup" className="block py-2 px-4 text-sm hover:bg-gray-700">Category Setup</NavLink>
          <NavLink to="/admin/manage-orders" className="block py-2 px-4 text-sm hover:bg-gray-700">Manage Orders</NavLink>
          <NavLink to="/admin/order-analytics" className="block py-2 px-4 text-sm hover:bg-gray-700">Order Analytics</NavLink>
          <NavLink to="/admin/login" className="block py-2 px-4 text-sm hover:bg-gray-700">Logout</NavLink>
        </nav>
      </div>
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
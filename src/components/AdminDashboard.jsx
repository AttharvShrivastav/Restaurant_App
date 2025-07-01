import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const restaurantId = 1; 

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/restaurants/${restaurantId}/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const completeOrder = async (id) => {
    try {
      await axios.patch(`http://localhost:5001/api/restaurants/${restaurantId}/orders/${id}`, { status: 'completed' });
      setOrders(prev => prev.filter(order => order.id !== id));
    } catch (err) {
      console.error('Error marking order as complete:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-green-700">Orders Dashboard</h1>
        <button onClick={fetchOrders} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-1">
          {/* Refresh Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l5 5M20 20l-5-5" />
          </svg>
          Refresh
        </button>
      </header>

      <div className="bg-white shadow rounded-lg p-4 divide-y">
        {loading ? <p>Loading...</p> : (
          orders.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-lg">No active orders!</p>
          ) : (
            orders.map(order => (
              <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-lg text-gray-800">Order #{order.id}</div>
                  <div className="text-sm text-gray-700 mb-1">
                    <span className="inline-block bg-gray-100 text-green-800 rounded px-2 py-0.5 mr-2 text-xs">Table: {order.table_id}</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    {order.items.map(it => (
                      <span key={it.name} className="inline-block mr-2">{it.name} <span className="text-gray-400">x{it.qty}</span></span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Total: ${order.total}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => completeOrder(order.id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Mark as Done</button>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
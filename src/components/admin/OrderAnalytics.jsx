import React from 'react';

const OrderAnalytics = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Order Analytics</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Orders per day</h2>
                {/* You would integrate a charting library like Chart.js or Recharts here */}
                <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
                    <p className="text-gray-500">Chart will be displayed here</p>
                </div>
            </div>
        </div>
    );
};

export default OrderAnalytics;
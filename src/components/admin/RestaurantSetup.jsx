import React, { useState } from 'react';

const RestaurantSetup = () => {
  const [restaurantName, setRestaurantName] = useState('My Awesome Restaurant');
  const [address, setAddress] = useState('123 Foodie Lane');
  const [phone, setPhone] = useState('123-456-7890');

  const handleSave = () => {
    // In a real app, you'd send this to a backend
    alert('Restaurant details saved!');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Restaurant Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">Restaurant Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">Address</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">Phone Number</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button
          onClick={handleSave}
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default RestaurantSetup;
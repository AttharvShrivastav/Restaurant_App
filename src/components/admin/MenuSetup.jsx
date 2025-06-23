import React, { useState } from 'react';

const MenuSetup = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Pizza', category: 'Main Course', price: 12.99 },
    { id: 2, name: 'Salad', category: 'Appetizer', price: 6.99 },
  ]);

  const handleAddItem = () => {
    // In a real app, you'd have a form and more complex logic
    const newItem = { id: Date.now(), name: 'New Item', category: 'Uncategorized', price: 9.99 };
    setMenuItems([...menuItems, newItem]);
  };

  const handleDeleteItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Menu Setup</h1>
      <button onClick={handleAddItem} className="mb-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md">
        Add New Item
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {menuItems.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.category} - ${item.price}</p>
            </div>
            <div>
              <button className="text-blue-500 hover:underline mr-4">Edit</button>
              <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSetup;
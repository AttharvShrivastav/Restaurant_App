import React from 'react';
import VegIcon from './VegIcon';

const MenuList = ({ menuItems, selectedCategory, cart, addToCart, removeFromCart, deleteFromCart }) => {
  const filtered = selectedCategory === 'all' ? menuItems : menuItems.filter(item => item.category_id === selectedCategory);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map(item => (
          <div key={item.id} className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-1">
                <VegIcon isVeg={item.item_type === 'veg'} />
                <span className="font-bold text-lg">{item.name}</span>
                <span className="ml-auto text-xs bg-gray-200 px-2 rounded text-gray-700">{item.calories} kcal</span>
              </div>
              <div className="mb-1 text-gray-600 text-sm">{item.description}</div>
              <div className="mb-2 text-xs text-gray-500">Main: {item.ingredients}</div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold text-green-700">${item.price}</span>
              {cart[item.id] ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600">−</button>
                  <span className="bg-gray-100 px-3 py-1 rounded font-semibold min-w-8 text-center">{cart[item.id]}</span>
                  <button onClick={() => addToCart(item.id)} className="bg-green-600 text-white w-8 h-8 rounded-full hover:bg-green-700">+</button>
                  <button onClick={() => deleteFromCart(item.id)} className="bg-gray-500 text-white w-8 h-8 rounded-full hover:bg-gray-600" title="Remove">🗑</button>
                </div>
              ) : (
                <button onClick={() => addToCart(item.id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;

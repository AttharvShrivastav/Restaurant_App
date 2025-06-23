import React from 'react';
import VegIcon from './VegIcon';

const Cart = ({ cart, menuItems, getCartTotal, addToCart, removeFromCart, deleteFromCart, onPlaceOrder }) => {
  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const item = menuItems.find(i => i.id === parseInt(id));
    return item ? { ...item, qty } : null;
  }).filter(Boolean);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-3 text-gray-700">Your Cart</h2>
      <div className="bg-white shadow rounded p-4 mb-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b py-3">
              <div className="flex-1">
                <div className="flex items-center">
                  <VegIcon isVeg={item.item_type === 'veg'} />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">${item.price} each</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white w-7 h-7 rounded-full">−</button>
                  <span className="bg-gray-100 px-2 py-1 rounded font-semibold text-center text-sm">{item.qty}</span>
                  <button onClick={() => addToCart(item.id)} className="bg-green-600 text-white w-7 h-7 rounded-full">+</button>
                </div>
                <span className="font-semibold text-green-700 min-w-16 text-right">${(item.qty * item.price).toFixed(2)}</span>
                <button onClick={() => deleteFromCart(item.id)} className="bg-gray-500 text-white w-7 h-7 rounded-full">🗑</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">Total: ${getCartTotal().toFixed(2)}</span>
        <button
          onClick={onPlaceOrder}
          className={`px-4 py-2 rounded ${cartItems.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
          disabled={cartItems.length === 0}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
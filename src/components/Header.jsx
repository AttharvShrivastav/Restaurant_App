import React from 'react';

const Header = ({ tableNumber, changeTable }) => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-3xl font-bold text-green-700">Quick Dine Menu</h1>
    <div className="text-right">
      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-1">
        Table {tableNumber}
      </div>
      <button onClick={changeTable} className="text-xs text-green-600 hover:text-green-800 underline">
        Change Table
      </button>
    </div>
  </div>
);

export default Header;
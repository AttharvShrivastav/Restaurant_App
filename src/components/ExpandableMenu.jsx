import React from 'react';

const ExpandableMenu = ({ visible, onToggle, categoryNames, onSelectCategory, orderHistory, onReorder }) => (
  <div className="fixed bottom-6 right-6 z-40">
    {visible && (
      <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg border mb-2 min-w-48">
        <div className="p-2 border-b">
          <div className="text-xs font-semibold text-gray-500 mb-2 px-2">CATEGORIES</div>
          <button onClick={() => onSelectCategory('all')} className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm">All Items</button>
          {categoryNames.map((cat, idx) => (
            <button
              key={cat.id || idx}
              onClick={() => onSelectCategory(cat.id)}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {orderHistory.length > 0 && (
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 mb-2 px-2">RE-ORDER</div>
            {orderHistory.slice(0, 3).map(order => (
              <button
                key={order.id}
                onClick={() => onReorder(order.items)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
              >
                <div className="flex justify-between">
                  <span>{Object.values(order.items).reduce((a, b) => a + b, 0)} items</span>
                  <span className="text-green-600 font-semibold">${order.total}</span>
                </div>
                <div className="text-xs text-gray-400">{order.date}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    )}
    <button
      onClick={onToggle}
      className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white text-2xl font-bold ${visible ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'}`}
    >
      {visible ? '×' : '☰'}
    </button>
  </div>
);

export default ExpandableMenu;

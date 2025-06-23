import React from 'react';

const TableSelectModal = ({ visible, onSelectTable }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 font-sans">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Select Your Table</h2>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              onClick={() => onSelectTable(num.toString())}
              className="bg-green-100 hover:bg-green-200 border-2 border-green-300 rounded-lg p-4 text-center font-semibold text-green-800"
            >
              {num}
            </button>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">Or enter a custom table number:</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Table number"
              className="flex-1 border rounded px-3 py-2"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) onSelectTable(e.target.value.trim());
              }}
            />
            <button
              onClick={(e) => {
                const input = e.target.previousElementSibling;
                if (input.value.trim()) onSelectTable(input.value.trim());
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSelectModal;

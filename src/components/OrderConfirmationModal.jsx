import React from 'react';

const OrderConfirmationModal = ({ visible, tableNumber, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50 font-sans">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm text-center">
        <h3 className="text-lg font-bold mb-4 text-green-700">Order Placed!</h3>
        <p className="mb-4">
          Thank you for ordering from <strong>Table {tableNumber}</strong>.<br />
          Our staff has received your order.<br />
          <span className="text-xs text-gray-400">You can now close this window.</span>
        </p>
        <button
          className="bg-green-700 text-white px-4 py-2 rounded mt-2 hover:bg-green-800"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;

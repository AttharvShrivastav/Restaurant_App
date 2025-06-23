import React from 'react';

const LoginModal = ({ visible, onCancel, onLogin, loginEmail, setLoginEmail, loginPassword, setLoginPassword, loginError }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50 font-sans">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4">Login to Confirm Order</h3>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={onLogin} className="bg-green-700 text-white rounded px-4 py-2 hover:bg-green-800">
            Login & Place Order
          </button>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 mt-2">
            Cancel
          </button>
        </div>
        {loginError && <p className="text-red-600 mt-2">{loginError}</p>}
      </div>
    </div>
  );
};

export default LoginModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Header from './components/Header';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import LoginModal from './components/LoginModal';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import TableSelectModal from './components/TableSelectModal';
import ExpandableMenu from './components/ExpandableMenu';

import { loadTableData, saveTableData } from './utils/storage';

const CustomerApp = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tableNumber, setTableNumber] = useState(null);
  const [cart, setCart] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showExpandableMenu, setShowExpandableMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orderHistory, setOrderHistory] = useState([]);
  const [showTableModal, setShowTableModal] = useState(false);

  const { restaurantId, table } = useParams();

  useEffect(() => {
    // You can now use the restaurantId to fetch data for a specific restaurant
    console.log("Restaurant ID:", restaurantId);

    axios.get(`http://localhost:5001/api/restaurants/${restaurantId}/menu`) // Example of how you might use restaurantId
      .then(res => {
        setMenuItems(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load menu items.');
        setLoading(false);
      });

    axios.get(`http://localhost:5001/api/restaurants/${restaurantId}/category`) // Example
      .then(res => setCategoryNames(res.data))
      .catch(() => setError('Failed to load categories.'));
  }, [restaurantId]);

  useEffect(() => {
    if (table) {
      setTableNumber(table);
      const { cart, history } = loadTableData(table);
      setCart(cart);
      setOrderHistory(history);
    } else {
      setShowTableModal(true);
    }
  }, [table]);

  const updateCart = (newCart) => {
    setCart(newCart);
    if (tableNumber) saveTableData(tableNumber, newCart, orderHistory);
  };

  const updateOrderHistory = (newHistory) => {
    setOrderHistory(newHistory);
    if (tableNumber) saveTableData(tableNumber, cart, newHistory);
  };

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) return setLoginError('Invalid credentials');
    if (Object.keys(cart).length === 0) return setLoginError('Cart is empty');

    try {
      const res = await axios.post(`http://localhost:5001/api/restaurants/${restaurantId}/orders`, { // Example
        table_number: tableNumber,
        items: cart,
        total: getCartTotal(),
      });
      const newOrder = {
        id: res.data.order_id,
        items: { ...cart },
        total: getCartTotal(),
        date: new Date().toLocaleDateString(),
        tableNumber
      };
      updateOrderHistory([newOrder, ...orderHistory]);
      setShowLoginModal(false);
      setShowOrderConfirm(true);
      updateCart({});
    } catch {
      setLoginError('Failed to place order.');
    }
  };

  const addToCart = (id) => updateCart({ ...cart, [id]: (cart[id] || 0) + 1 });
  const removeFromCart = (id) => {
    const newCart = { ...cart };
    if (newCart[id] > 1) newCart[id]--;
    else delete newCart[id];
    updateCart(newCart);
  };
  const deleteFromCart = (id) => {
    const newCart = { ...cart };
    delete newCart[id];
    updateCart(newCart);
  };

  const getCartTotal = () => Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find(i => i.id === parseInt(id));
    return item ? sum + item.price * qty : sum;
  }, 0);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Header tableNumber={tableNumber} changeTable={() => setShowTableModal(true)} />

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <MenuList
          menuItems={menuItems}
          selectedCategory={selectedCategory}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          deleteFromCart={deleteFromCart}
        />

        <Cart
          cart={cart}
          menuItems={menuItems}
          getCartTotal={getCartTotal}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          deleteFromCart={deleteFromCart}
          onPlaceOrder={() => setShowLoginModal(true)}
        />
      </div>

      <LoginModal
        visible={showLoginModal}
        onCancel={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        loginError={loginError}
      />

      <OrderConfirmationModal
        visible={showOrderConfirm}
        tableNumber={tableNumber}
        onClose={() => setShowOrderConfirm(false)}
      />

      <TableSelectModal
        visible={showTableModal}
        onSelectTable={(num) => {
          setTableNumber(num);
          setShowTableModal(false);
        }}
      />

      <ExpandableMenu
        visible={showExpandableMenu}
        onToggle={() => setShowExpandableMenu(!showExpandableMenu)}
        categoryNames={categoryNames}
        onSelectCategory={setSelectedCategory}
        orderHistory={orderHistory}
        onReorder={updateCart}
      />
    </div>
  );
};

export default CustomerApp;
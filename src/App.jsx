import { Routes, Route } from "react-router";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useState } from 'react';
import Toast from './components/Toast';

function App() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
  };

  return (
    <>
      <Navbar showToast={showToast} />
      <Toast message={toastMessage} type={toastType} />
      <Routes>
        <Route path="/" element={<Home showToast={showToast} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}
export default App;
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProductDetails from './pages/ProductDetails';
import Orders from './pages/orders';
import About from './pages/About';
import NewArrivals from './pages/NewArrivals';
import Outerwear from './pages/Outerwear';
import Accessories from './pages/Accessories';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar onCartClick={() => setCartOpen(true)} />
          <CartDrawer
            open={cartOpen}
            onClose={() => setCartOpen(false)}
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="/about" element={<About />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/outerwear" element={<Outerwear />} />
            <Route path="/accessories" element={<Accessories />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
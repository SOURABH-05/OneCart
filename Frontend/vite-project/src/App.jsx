import React, { useContext } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Registration from './Pages/Registration';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Nav from './components/Nav';
import About from './Pages/About';
import Collections from './Pages/Collections';
import Product from './Pages/Product';
import Contact from './Pages/Contact';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import PlaceOrder from './Pages/PlaceOrder';
import Order from './Pages/Order';
import OrderConfirmation from './Pages/OrderConfirmation';
import NotFound from './Pages/NotFound';
import Ai from './components/Ai';

import { userDataContext } from './context/UserContext';

// Wrapper to reduce boilerplate on every protected route
const Protected = ({ element }) => {
  const location = useLocation();
  const { userData } = useContext(userDataContext);
  return userData
    ? element
    : <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

const App = () => {
  const { userData } = useContext(userDataContext);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />

      <Nav />

      <Routes>
        {/* Auth routes — redirect to home if already logged in */}
        <Route
          path="/login"
          element={userData ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={userData ? <Navigate to="/" replace /> : <Registration />}
        />

        {/* Protected routes */}
        <Route path="/"                     element={<Protected element={<Home />} />} />
        <Route path="/about"                element={<Protected element={<About />} />} />
        <Route path="/collections"          element={<Protected element={<Collections />} />} />
        <Route path="/product"              element={<Protected element={<Product />} />} />
        <Route path="/contact"              element={<Protected element={<Contact />} />} />
        <Route path="/productdetail/:productId" element={<Protected element={<ProductDetail />} />} />
        <Route path="/cart"                 element={<Protected element={<Cart />} />} />
        <Route path="/placeorder"           element={<Protected element={<PlaceOrder />} />} />
        <Route path="/order"                element={<Protected element={<Order />} />} />
        <Route path="/order-confirmation"   element={<Protected element={<OrderConfirmation />} />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Ai />
    </>
  );
};

export default App;
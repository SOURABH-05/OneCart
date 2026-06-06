import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import { IoSearchCircle, IoSearchCircleOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { MdContacts, MdOutlineShoppingCart } from 'react-icons/md';
import { userDataContext } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { authDataContext } from '../context/AuthContext';
import { HiOutlineCollection } from 'react-icons/hi';
import axios from 'axios';
import { IoMdHome } from 'react-icons/io';
import { shopDataContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Nav = () => {
  const { userData, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(shopDataContext);

  const [showProfile, setShowProfile] = useState(false);
  const [prevCount, setPrevCount] = useState(0);
  const [badgePop, setBadgePop] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = getCartCount();

  // Animate cart badge on count increase
  useEffect(() => {
    if (cartCount > prevCount) {
      setBadgePop(true);
      const t = setTimeout(() => setBadgePop(false), 300);
      return () => clearTimeout(t);
    }
    setPrevCount(cartCount);
  }, [cartCount]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      await axios.post(serverUrl + '/api/auth/logout', {}, { withCredentials: true });
      toast.success('Logged out successfully');
      setUserData(null);
      setShowProfile(false);
      navigate('/login');
    } catch {
      toast.error('Logout failed');
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/collections' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-50 fixed top-0 flex items-center justify-between px-5 md:px-8 shadow-md shadow-black/20">

      {/* Logo */}
      <button
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={logo} alt="OneCart logo" className="w-[30px]" />
        <span className="text-[22px] font-bold text-black tracking-tight">OneCart</span>
      </button>

      {/* Desktop nav links */}
      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`text-[14px] font-semibold px-4 py-2 rounded-full transition-colors ${
              isActive(link.path)
                ? 'bg-black text-white'
                : 'text-black hover:bg-black/10'
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-3">
        {/* Search */}
        {!showSearch ? (
          <button
            onClick={() => { setShowSearch(true); navigate('/collections'); }}
            className="text-black hover:opacity-70 transition-opacity"
            title="Search"
          >
            <IoSearchCircleOutline className="w-[36px] h-[36px]" />
          </button>
        ) : (
          <button
            onClick={() => { setShowSearch(false); setSearch(''); }}
            className="text-black hover:opacity-70 transition-opacity"
            title="Close search"
          >
            <IoSearchCircle className="w-[36px] h-[36px]" />
          </button>
        )}

        {/* Cart */}
        <div className="relative hidden md:block">
          <button onClick={() => navigate('/cart')} title="Cart">
            <MdOutlineShoppingCart className="w-[28px] h-[28px] text-black" />
          </button>
          {cartCount > 0 && (
            <span
              className={`absolute -top-[6px] -right-[6px] w-[18px] h-[18px] bg-black text-white rounded-full text-[10px] font-bold flex items-center justify-center ${
                badgePop ? 'badge-pop' : ''
              }`}
            >
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          {userData ? (
            <button
              className="w-[32px] h-[32px] bg-black text-white rounded-full flex items-center justify-center font-semibold text-[14px] hover:bg-gray-800 transition-colors"
              onClick={() => setShowProfile((p) => !p)}
              title="Profile"
            >
              {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </button>
          ) : (
            <button onClick={() => setShowProfile((p) => !p)} title="Profile">
              <FaUserCircle className="w-[28px] h-[28px] text-black" />
            </button>
          )}

          {/* Dropdown */}
          {showProfile && (
            <div className="absolute top-[calc(100%+10px)] right-0 w-[200px] bg-[#0a1a1f] border border-[#80808040] rounded-xl shadow-2xl overflow-hidden z-50">
              <ul className="py-2 text-[14px] text-white">
                {userData ? (
                  <>
                    <li className="px-4 py-2 text-[#8db4bc] text-[12px] truncate border-b border-[#80808030]">
                      {userData.name}
                    </li>
                    <li
                      className="px-4 py-3 hover:bg-[#1a3540] cursor-pointer transition-colors"
                      onClick={() => { navigate('/order'); setShowProfile(false); }}
                    >
                      My Orders
                    </li>
                    <li
                      className="px-4 py-3 hover:bg-[#1a3540] cursor-pointer transition-colors text-red-400 hover:text-red-300"
                      onClick={handleLogOut}
                    >
                      Log Out
                    </li>
                  </>
                ) : (
                  <li
                    className="px-4 py-3 hover:bg-[#1a3540] cursor-pointer transition-colors"
                    onClick={() => { navigate('/login'); setShowProfile(false); }}
                  >
                    Login
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className="w-full h-[70px] bg-[#d8f6f9dd] absolute top-full left-0 flex items-center justify-center px-4 shadow-md">
          <div className="relative w-full max-w-[600px]">
            <input
              type="text"
              autoFocus
              className="w-full h-[46px] bg-[#1a3540] rounded-full px-5 pr-10 placeholder-[#8db4bc] text-white text-[15px] focus:outline-none focus:ring-2 focus:ring-[#46d1f7]"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8db4bc] hover:text-white text-[18px]"
                onClick={() => setSearch('')}
              >
                ×
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 w-full h-[60px] bg-[#0a1a1f] border-t border-[#80808030] flex items-center justify-around md:hidden z-40">
        <button
          className="flex flex-col items-center gap-0.5 text-[10px] text-white"
          onClick={() => navigate('/')}
        >
          <IoMdHome className={`w-[24px] h-[24px] ${isActive('/') ? 'text-[#46d1f7]' : ''}`} />
          Home
        </button>
        <button
          className="flex flex-col items-center gap-0.5 text-[10px] text-white"
          onClick={() => navigate('/collections')}
        >
          <HiOutlineCollection
            className={`w-[24px] h-[24px] ${isActive('/collections') ? 'text-[#46d1f7]' : ''}`}
          />
          Shop
        </button>
        <button
          className="flex flex-col items-center gap-0.5 text-[10px] text-white"
          onClick={() => navigate('/contact')}
        >
          <MdContacts
            className={`w-[24px] h-[24px] ${isActive('/contact') ? 'text-[#46d1f7]' : ''}`}
          />
          Contact
        </button>
        <button
          className="flex flex-col items-center gap-0.5 text-[10px] text-white relative"
          onClick={() => navigate('/cart')}
        >
          <MdOutlineShoppingCart
            className={`w-[24px] h-[24px] ${isActive('/cart') ? 'text-[#46d1f7]' : ''}`}
          />
          {cartCount > 0 && (
            <span className="absolute -top-1 right-2 w-[16px] h-[16px] bg-[#46d1f7] text-[#0c2025] font-bold rounded-full text-[9px] flex items-center justify-center">
              {cartCount}
            </span>
          )}
          Cart
        </button>
      </div>
    </div>
  );
};

export default Nav;

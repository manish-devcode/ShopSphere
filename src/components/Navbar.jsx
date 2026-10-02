import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  Package,
  MapPin,
  Settings,
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useUser } from '../context/UserContext.jsx';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItemsCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout, login } = useUser();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');

  const dropdownRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Click outside detection
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavSearch = (e) => {
    e.preventDefault();
    if (navSearchQuery.trim()) {
      navigate(`/products?query=${encodeURIComponent(navSearchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
      isActive
        ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
        : 'text-slate-600 dark:text-slate-300'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          
          {/* Logo & Navigation */}
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-900 dark:text-white"
              aria-label="ShopSphere Home"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight font-heading">
                Shop<span className="text-indigo-600 dark:text-indigo-400">Sphere</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/products" className={navLinkClass}>
                Products
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Toggle / Desktop Input */}
            <form onSubmit={handleNavSearch} className="hidden lg:flex items-center relative w-56">
              <input
                type="text"
                placeholder="Search..."
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100/90 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            </form>

            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark Mode */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-3.5 h-3.5 text-[9px] font-bold text-white bg-rose-500 rounded-full tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart with Small Badge */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label={`Cart with ${totalItemsCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemsCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-3.5 h-3.5 text-[9px] font-bold text-white bg-indigo-600 rounded-full tabular-nums">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="w-7 h-7 rounded-full bg-slate-900 text-white dark:bg-slate-800 text-xs font-semibold flex items-center justify-center hover:opacity-90"
                  aria-expanded={profileDropdownOpen}
                >
                  {user?.name ? user.name.charAt(0) : 'A'}
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-lg z-50 p-1.5 text-xs">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {user.name}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/orders"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <Package className="w-3.5 h-3.5 text-slate-400" />
                      <span>My Orders</span>
                    </Link>

                    <Link
                      to="/profile/addresses"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Addresses</span>
                    </Link>

                    <Link
                      to="/wishlist"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <Heart className="w-3.5 h-3.5 text-slate-400" />
                      <span>Wishlist</span>
                    </Link>

                    <Link
                      to="/profile/settings"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Settings</span>
                    </Link>

                    <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={login}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                Login
              </button>
            )}

            {/* Mobile Hamburger Menu */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        {searchOpen && (
          <div className="lg:hidden pb-3">
            <form onSubmit={handleNavSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                autoFocus
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2">
          <NavLink to="/" className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Home
          </NavLink>
          <NavLink to="/products" className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Products
          </NavLink>
          <NavLink to="/about" className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            About
          </NavLink>
          <div className="border-t border-slate-100 dark:border-slate-800 pt-2 space-y-1">
            <Link to="/profile" className="block py-1.5 text-xs text-slate-600 dark:text-slate-400">
              My Profile
            </Link>
            <Link to="/orders" className="block py-1.5 text-xs text-slate-600 dark:text-slate-400">
              My Orders
            </Link>
            <Link to="/profile/addresses" className="block py-1.5 text-xs text-slate-600 dark:text-slate-400">
              Addresses
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, Package, Heart, MapPin, Settings, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';

export default function ProfileSidebar() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
      isActive
        ? 'bg-slate-100 text-slate-900 font-semibold dark:bg-slate-800 dark:text-white'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
    }`;

  return (
    <aside className="space-y-1">
      <nav className="space-y-1">
        <NavLink to="/profile" end className={navItemClass}>
          <User className="w-4 h-4 text-slate-400" />
          <span>Profile</span>
        </NavLink>
        <NavLink to="/orders" className={navItemClass}>
          <Package className="w-4 h-4 text-slate-400" />
          <span>Orders</span>
        </NavLink>
        <NavLink to="/profile/addresses" className={navItemClass}>
          <MapPin className="w-4 h-4 text-slate-400" />
          <span>Addresses</span>
        </NavLink>
        <NavLink to="/wishlist" className={navItemClass}>
          <Heart className="w-4 h-4 text-slate-400" />
          <span>Wishlist</span>
        </NavLink>
        <NavLink to="/profile/settings" className={navItemClass}>
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

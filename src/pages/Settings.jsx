import React, { useState } from 'react';
import ProfileSidebar from '../components/ProfileSidebar.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [orderAlerts, setOrderAlerts] = useState(true);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left: Sidebar */}
        <div className="md:col-span-4 lg:col-span-3">
          <ProfileSidebar />
        </div>

        {/* Right: Settings Content */}
        <div className="md:col-span-8 lg:col-span-9 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
          
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Appearance
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Theme: <span className="capitalize font-normal text-indigo-600 dark:text-indigo-400">{theme} Mode</span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Saved automatically to your device.
                </p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Switch to {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Notifications
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Order status updates
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Receive shipping milestones and tracking notifications.
                </p>
              </div>
              <input
                type="checkbox"
                checked={orderAlerts}
                onChange={() => {
                  setOrderAlerts(!orderAlerts);
                  addToast('Preferences saved');
                }}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

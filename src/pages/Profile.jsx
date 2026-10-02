import React, { useState } from 'react';
import ProfileSidebar from '../components/ProfileSidebar.jsx';
import { useUser } from '../context/UserContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Profile() {
  const { user, updateUser } = useUser();
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Morgan',
    email: user?.email || 'alex@example.com',
    phone: user?.phone || '+91 98765 43210',
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
    addToast('Profile updated');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          Account
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left: Small Profile Navigation */}
        <div className="md:col-span-4 lg:col-span-3">
          <ProfileSidebar />
        </div>

        {/* Right: Profile Information */}
        <div className="md:col-span-8 lg:col-span-9 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          
          {/* Avatar and Basic Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-slate-900 text-white dark:bg-slate-800 flex items-center justify-center font-bold text-xl">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {user?.name}
              </h2>
              <p className="text-xs text-slate-400">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Profile Information View or Edit */}
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 max-w-md text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg font-semibold text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 max-w-md text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400 block">Full Name</span>
                  <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {user?.name}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Email Address</span>
                  <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {user?.email}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Phone Number</span>
                  <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {user?.phone}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

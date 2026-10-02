// User profile service connected to Express REST API (/api/users/:id)
import { API_BASE_URL } from './apiConfig.js';
import { INITIAL_USER } from '../data/mockUser.js';

const STORAGE_KEY = 'shopsphere_user';

function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read user from localStorage', e);
  }
  return INITIAL_USER;
}

function saveStoredUser(user) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to write user to localStorage', e);
  }
}

export const userService = {
  /**
   * Fetch user profile
   * Endpoint: GET /api/users/:id
   */
  async getProfile(userId = 'user_001') {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${encodeURIComponent(userId)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          saveStoredUser(json.data);
          return json.data;
        }
      }
    } catch (err) {
      console.warn('API getProfile failed, fallback to local storage:', err);
    }
    return getStoredUser();
  },

  /**
   * Update user profile
   * Endpoint: PUT /api/users/:id
   */
  async updateProfile(updates, userId = 'user_001') {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${encodeURIComponent(userId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          saveStoredUser(json.data);
          return json.data;
        }
      }
    } catch (err) {
      console.warn('API updateProfile failed, updating local storage:', err);
    }

    const current = getStoredUser();
    const updated = { ...current, ...updates };
    saveStoredUser(updated);
    return updated;
  }
};

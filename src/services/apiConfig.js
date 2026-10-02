// ShopSphere REST API base URL configuration
// In Google AI Studio Build environment, the Express backend and Vite frontend
// run unified on port 3000, so relative same-origin '/api' routing works seamlessly
// without any CORS restrictions or ERR_CONNECTION_REFUSED errors.

export const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
  '/api';

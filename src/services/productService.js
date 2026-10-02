// Product service connected to Express REST API (/api/products)
import { API_BASE_URL } from './apiConfig.js';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mockProducts.js';

export const productService = {
  /**
   * Fetch all products with optional filtering and sorting
   * Endpoint: GET /api/products?category=...&search=...&sort=...
   */
  async getProducts({ category = 'all', query = '', sortBy = 'default' } = {}) {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all') {
        params.append('category', category);
      }
      if (query && query.trim() !== '') {
        params.append('search', query.trim());
      }
      if (sortBy && sortBy !== 'default') {
        const sortMap = {
          'price-asc': 'price_asc',
          'price-desc': 'price_desc',
          'rating': 'rating',
        };
        if (sortMap[sortBy]) {
          params.append('sort', sortMap[sortBy]);
        }
      }

      const queryString = params.toString();
      const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('Backend API request failed, using in-memory dataset:', err);
    }

    // Local fallback
    let results = [...MOCK_PRODUCTS];
    if (category && category !== 'all') {
      results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (query && query.trim() !== '') {
      const q = query.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return results;
  },

  /**
   * Fetch a single product by ID
   * Endpoint: GET /api/products/:id
   */
  async getProductById(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(id)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('Backend API product fetch failed, checking local dataset:', err);
    }

    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    return product;
  },

  /**
   * Fetch featured products for homepage spotlight
   */
  async getFeaturedProducts() {
    try {
      const all = await this.getProducts();
      return all.filter((p) => p.isFeatured || p.price > 100).slice(0, 4);
    } catch (err) {
      return MOCK_PRODUCTS.slice(0, 4);
    }
  },

  /**
   * Fetch all category taxonomy metadata
   */
  async getCategories() {
    return MOCK_CATEGORIES;
  }
};

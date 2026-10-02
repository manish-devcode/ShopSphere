// Product controller managing in-memory product queries
// Ready for future integration with Mongoose: Product.find(), Product.findById()

import { products } from '../data/products.js';

/**
 * @desc   Fetch all products with filtering, search, and sorting
 * @route  GET /api/products
 */
export const getProducts = (req, res, next) => {
  try {
    const { category, search, sort } = req.query;
    let results = [...products];

    // Filter by Category
    if (category && category.toLowerCase() !== 'all') {
      results = results.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by Search Query
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort Products
    if (sort) {
      switch (sort.toLowerCase()) {
        case 'price_asc':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Fetch single product by ID (supports 'prod-001', '1', etc.)
 * @route  GET /api/products/:id
 */
export const getProductById = (req, res, next) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const product = products.find((p, index) => {
      const pId = p.id.toLowerCase();
      return (
        pId === cleanId ||
        pId === `prod-00${cleanId}` ||
        pId === `prod-0${cleanId}` ||
        pId === `prod-${cleanId}` ||
        String(index + 1) === cleanId
      );
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

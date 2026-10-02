import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Star,
  ArrowLeft,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { productService } from '../services/productService.js';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { Spinner } from '../components/Loader.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const prod = await productService.getProductById(id);
        if (!isMounted) return;
        setProduct(prod);

        // Load 4 related products
        const allProds = await productService.getProducts({ category: prod.category });
        if (isMounted) {
          setRelatedProducts(allProds.filter((p) => p.id !== prod.id).slice(0, 4));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Product not found');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          title="Product Not Found"
          description="The product you are looking for does not exist or has been removed."
          actionLabel="Explore Products"
          actionTo="/products"
        />
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      
      {/* Subtle Back Link */}
      <div className="mb-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Products</span>
        </Link>
      </div>

      {/* Spacious 2-Column Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left: Large Product Image */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/60 aspect-square border border-slate-100 dark:border-slate-800">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Right: Clean Product Information */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              {product.categoryLabel || product.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                {product.rating?.toFixed(1) || '4.8'}
              </span>
              <span className="text-xs text-slate-400">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Clean Price */}
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums font-heading">
            ${product.price}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Quantity
              </span>
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l-lg"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold tabular-nums text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 20, q + 1))}
                  className="px-3 py-1 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-lg"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 active:scale-98 ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {justAdded ? 'Added to Cart' : 'Add to Cart'}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 py-3 px-6 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
              >
                Buy Now
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition-colors ${
                  isFavorite
                    ? 'border-rose-200 bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900'
                    : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Simple Information Row */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Free delivery on orders over $150</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Easy 30-day return policy</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Secure checkout encryption</span>
            </div>
          </div>

        </div>

      </div>

      {/* Description & Specifications Section */}
      <section className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800/80 max-w-3xl">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-4">
          Product Details
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
          {product.description}
        </p>

        {product.specifications && (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80 border-y border-slate-100 dark:border-slate-800/80">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="py-2.5 flex justify-between gap-4 text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{key}</span>
                <span className="text-slate-500 dark:text-slate-400 text-right">{val}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reviews Summary */}
      <section className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/80 max-w-3xl">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-4">
          Customer Reviews
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-300 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="font-bold text-slate-900 dark:text-white ml-1">Excellent quality</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            "Arrived right on time and in perfect condition. Materials feel very premium."
          </p>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Related Products
            </h2>
            <Link
              to={`/products?category=${product.category}`}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              View More
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

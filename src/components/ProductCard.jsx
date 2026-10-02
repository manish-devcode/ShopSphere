import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-3 sm:p-4 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <div>
        {/* Large Product Image Frame */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/60 mb-3 flex items-center justify-center">
          {product.image && !imageError ? (
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-300 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-medium">
              {product.name}
            </div>
          )}

          {/* Small Wishlist Icon (Top Right) */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-colors ${
              isFavorite
                ? 'bg-white/90 dark:bg-slate-900/90 text-rose-500 shadow-sm'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-400 hover:text-rose-500 shadow-xs'
            }`}
            aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Minimal Category & Product Name */}
        <div className="space-y-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            {product.categoryLabel || product.category}
          </span>

          <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm leading-snug line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {product.name}
          </h3>

          {/* Simple Rating Row */}
          <div className="flex items-center gap-1 pt-0.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
              {product.rating?.toFixed(1) || '4.8'}
            </span>
          </div>
        </div>
      </div>

      {/* Clean Price & Add to Cart Row */}
      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
        <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
          ${product.price}
        </span>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 hover:bg-indigo-600 text-white dark:bg-slate-800 dark:hover:bg-indigo-600'
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          {justAdded ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

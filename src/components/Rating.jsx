import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export default function Rating({ rating = 0, reviewCount, size = 'sm', showCount = true }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.8;
  const starSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating ${rating} out of 5 stars`}>
      <div className="flex items-center text-amber-400">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className={`${starSize} fill-amber-400 text-amber-400`} />;
          }
          if (i === fullStars && hasHalfStar) {
            return <StarHalf key={i} className={`${starSize} fill-amber-400 text-amber-400`} />;
          }
          return <Star key={i} className={`${starSize} text-slate-300 dark:text-slate-600`} />;
        })}
      </div>
      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

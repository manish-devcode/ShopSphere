import React from 'react';
import ProductCard from './ProductCard.jsx';
import { SkeletonGrid } from './Loader.jsx';
import EmptyState from './EmptyState.jsx';

export default function ProductGrid({
  products = [],
  loading = false,
  emptyTitle = 'No products found',
  emptyDescription = 'Try adjusting your search query or selecting a different category.',
  onResetFilters,
}) {
  if (loading) {
    return <SkeletonGrid count={8} />;
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel="Clear Filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

import React from "react";
import ProductCard from "./ProductCard";
import SortFilterControls from "./SortFilterControls";
import CartSummary from "./CartSummary";

// Presenter: purely presentational. No API/business logic here.
const ProductListPresenter = ({
  products = [],
  loading,
  error,
  onAddToCart,
  cart = [],
  onRemoveFromCart,
  onChangeQuantity,
  sortOption,
  categoryFilter,
  onSortChange,
  onFilterChange,
}) => {
  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <SortFilterControls
          sortOption={sortOption}
          categoryFilter={categoryFilter}
          onSortChange={onSortChange}
          onFilterChange={onFilterChange}
        />

        {loading && <p className="text-gray-600 mt-4">Loading products...</p>}
        {error && <p className="text-red-600 mt-4">Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={() => onAddToCart(p)} />
          ))}
        </div>
      </div>

      <aside className="w-80">
        <CartSummary
          items={cart}
          onRemove={onRemoveFromCart}
          onChangeQuantity={onChangeQuantity}
        />
      </aside>
    </div>
  );
};

export default ProductListPresenter;

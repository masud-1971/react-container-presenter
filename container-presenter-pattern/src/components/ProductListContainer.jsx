import React, { useEffect, useState, useMemo } from "react";
import ProductListPresenter from "./ProductListPresenter";

// Container: handles API calls, cart state, error handling, and business logic.
// Prefer Vite env var VITE_API_BASE, fallback to the fake-apis server used in this workspace.
const API_BASE =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE) ||
  "http://localhost:3001/api";

const ProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cart: { productId: { product, quantity } }
  const [cartMap, setCartMap] = useState({});

  // Sort & filter state (managed here; presenter provides UI to change them)
  const [sortOption, setSortOption] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/products`, { signal: ac.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (err.name !== "AbortError")
          setError(err.message || "Failed to load products");
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, []);

  // Derived products after sort & filter
  const visibleProducts = useMemo(() => {
    let list = [...products];
    if (categoryFilter && categoryFilter !== "all") {
      list = list.filter(
        (p) => p.category === categoryFilter || p.categoryId === categoryFilter
      );
    }

    switch (sortOption) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
      // keep server order
    }

    return list;
  }, [products, sortOption, categoryFilter]);

  function handleAddToCart(product) {
    setCartMap((prev) => {
      const existing = prev[product.id];
      const next = { ...prev };
      next[product.id] = {
        product,
        quantity: existing ? existing.quantity + 1 : 1,
      };
      return next;
    });
  }

  function handleRemoveFromCart(productId) {
    setCartMap((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }

  function handleChangeQuantity(productId, quantity) {
    setCartMap((prev) => {
      const next = { ...prev };
      const entry = next[productId];
      if (!entry) return prev;
      if (quantity <= 0) {
        delete next[productId];
      } else {
        next[productId] = { ...entry, quantity };
      }
      return next;
    });
  }

  function handleSortChange(option) {
    setSortOption(option);
  }

  function handleFilterChange(category) {
    setCategoryFilter(category);
  }

  const cart = Object.values(cartMap);

  return (
    <ProductListPresenter
      products={visibleProducts}
      loading={loading}
      error={error}
      onAddToCart={handleAddToCart}
      onRemoveFromCart={handleRemoveFromCart}
      onChangeQuantity={handleChangeQuantity}
      cart={cart}
      sortOption={sortOption}
      categoryFilter={categoryFilter}
      onSortChange={handleSortChange}
      onFilterChange={handleFilterChange}
    />
  );
};

export default ProductListContainer;

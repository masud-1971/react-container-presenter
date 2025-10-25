import React from "react";

const DEFAULT_CATEGORIES = [
  "all",
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
];

const SortFilterControls = ({
  sortOption,
  categoryFilter,
  onSortChange,
  onFilterChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-700">Sort:</label>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-700">Category:</label>
        <select
          value={categoryFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {DEFAULT_CATEGORIES.map((c) => (
            <option key={c} value={c === "all" ? "all" : c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortFilterControls;

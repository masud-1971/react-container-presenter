import React from "react";

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-40 w-full object-cover rounded"
      />
      <div className="mt-3 flex-1">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <span className="font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through ml-2">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={onAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

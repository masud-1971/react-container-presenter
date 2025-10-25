import React from "react";

const CartSummary = ({ items = [], onRemove, onChangeQuantity }) => {
  const total = items.reduce(
    (s, it) => s + (it.product.price || 0) * it.quantity,
    0
  );

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-3">Cart</h2>
      {items.length === 0 && (
        <p className="text-sm text-gray-600">Cart is empty</p>
      )}

      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.product.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{it.product.name}</div>
              <div className="text-sm text-gray-500">
                ${it.product.price} x {it.quantity}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={it.quantity}
                min={0}
                onChange={(e) =>
                  onChangeQuantity(it.product.id, Number(e.target.value))
                }
                className="w-16 p-1 border rounded text-sm"
              />
              <button
                className="text-red-600 text-sm"
                onClick={() => onRemove(it.product.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 border-t pt-3">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

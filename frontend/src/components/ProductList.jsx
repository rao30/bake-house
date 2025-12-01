import { useState } from "react";

export default function ProductList({ products, onAddItem }) {
  const [quantities, setQuantities] = useState({});

  const handleChange = (key, value) => {
    setQuantities((prev) => ({ ...prev, [key]: Number(value) || 0 }));
  };

  const handleAdd = (key) => {
    const qty = quantities[key] || 0;
    if (qty <= 0) return;
    onAddItem({ product_type: key, quantity: qty, options: {} });
    setQuantities((prev) => ({ ...prev, [key]: 0 }));
  };

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {products.map((p) => (
          <li key={p.key} style={{ marginBottom: "1rem" }}>
            <strong>{p.display_name}</strong> <br />
            Daily capacity: {p.daily_capacity}
            {p.per_order_max && <> | Max per order: {p.per_order_max}</>}
            <div style={{ marginTop: "0.5rem" }}>
              <input
                type="number"
                min="0"
                value={quantities[p.key] || ""}
                onChange={(e) => handleChange(p.key, e.target.value)}
                placeholder="Qty"
              />
              <button onClick={() => handleAdd(p.key)} style={{ marginLeft: "0.5rem" }}>
                Add
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

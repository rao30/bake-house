export default function CartSummary({ items, onRemoveItem }) {
  if (!items.length) return <p>No items in cart.</p>;

  const grouped = items.reduce((acc, item, idx) => {
    const key = `${item.product_type}-${idx}`;
    acc[key] = item;
    return acc;
  }, {});

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {Object.entries(grouped).map(([key, item]) => (
          <li key={key}>
            {item.product_type} x {item.quantity}
            <button onClick={() => onRemoveItem(key)} style={{ marginLeft: "0.5rem" }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

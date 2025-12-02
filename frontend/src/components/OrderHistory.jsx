import { useEffect, useState } from "react";
import { fetchMyOrders } from "../api/client";

export default function OrderHistory({ isAuthenticated }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setOrders([]);
      return;
    }
    fetchMyOrders()
      .then(setOrders)
      .catch((err) => setError(err.message));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div>
        <h3>Your Orders</h3>
        <p>Sign in with Google to see your order history.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Your Orders</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!orders.length ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} style={{ marginBottom: "1rem" }}>
              <strong>Order ID:</strong> {order.id}
              <br />
              <strong>Status:</strong> {order.status}
              <br />
              <strong>Pickup:</strong> {new Date(order.pickup_datetime).toLocaleString()}
              <br />
              <strong>Items:</strong>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.product_type} x {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

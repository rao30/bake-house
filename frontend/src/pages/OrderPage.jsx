import { useEffect, useState } from "react";
import { fetchProductConfig } from "../api/client";
import ProductList from "../components/ProductList";
import CartSummary from "../components/CartSummary";
import OrderForm from "../components/OrderForm";
import AuthPanel from "../components/AuthPanel";
import OrderHistory from "../components/OrderHistory";

export default function OrderPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [auth, setAuth] = useState({ user: null, token: null });

  useEffect(() => {
    fetchProductConfig()
      .then(setProducts)
      .catch((err) => console.error(err));
  }, []);

  const handleAddItem = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const handleRemoveItem = (key) => {
    // key is unique per item as defined in CartSummary
    const index = Number(key.split("-").pop());
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleOrderCreated = (order) => {
    setLastOrder(order);
    setCart([]);
  };

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ flex: 2 }}>
        <ProductList products={products} onAddItem={handleAddItem} />
        <CartSummary items={cart} onRemoveItem={handleRemoveItem} />
        <OrderHistory isAuthenticated={!!auth.user} />
      </div>
      <div style={{ flex: 1 }}>
        <OrderForm cartItems={cart} onOrderCreated={handleOrderCreated} />
        <div style={{ marginTop: "1rem" }}>
          <AuthPanel onAuthChange={setAuth} />
        </div>
        {lastOrder && (
          <div style={{ marginTop: "1rem" }}>
            <h3>Last Order ID</h3>
            <p>{lastOrder.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}

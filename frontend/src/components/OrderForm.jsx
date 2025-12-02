import { useState } from "react";
import { checkout } from "../api/client";

export default function OrderForm({ cartItems, onOrderCreated }) {
  const [pickupDatetime, setPickupDatetime] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState([]);
  const [payment, setPayment] = useState(null);

  const handleChangeCustomer = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrors([]);
    setPayment(null);

    const orderPayload = {
      customer,
      pickup_datetime: new Date(pickupDatetime).toISOString(),
      items: cartItems,
    };

    try {
      const result = await checkout(orderPayload);
      setStatus("success");
      setPayment(result.payment);
      onOrderCreated(result.order);
    } catch (err) {
      setStatus("error");
      setErrors([err.message]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <div>
        <label>
          Pickup date & time:
          <input
            type="datetime-local"
            value={pickupDatetime}
            onChange={(e) => setPickupDatetime(e.target.value)}
            required
          />
        </label>
      </div>

      <h3>Customer Info</h3>
      <div>
        <label>
          Name:
          <input
            value={customer.name}
            onChange={(e) => handleChangeCustomer("name", e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={customer.email}
            onChange={(e) => handleChangeCustomer("email", e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Phone:
          <input
            value={customer.phone}
            onChange={(e) => handleChangeCustomer("phone", e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Notes:
          <textarea
            value={customer.notes}
            onChange={(e) => handleChangeCustomer("notes", e.target.value)}
          />
        </label>
      </div>

      <button type="submit" disabled={!cartItems.length || !pickupDatetime}>
        Place Order
      </button>

      {status === "loading" && <p>Validating order...</p>}
      {status === "success" && (
        <div>
          <p>Order created successfully! 🎉</p>
          {payment && (
            <div style={{ marginTop: "0.5rem", padding: "0.5rem", border: "1px solid #ddd" }}>
              <p>
                Payment session ({payment.provider}): <strong>{payment.session_id}</strong>
              </p>
              <p>Status: {payment.status}</p>
              <p style={{ color: "#6b7280" }}>
                Use this session with the configured gateway to capture payment.
              </p>
            </div>
          )}
        </div>
      )}
      {status === "error" && (
        <ul style={{ color: "red" }}>
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

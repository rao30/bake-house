import { useState } from "react";
import { previewOrder, createOrder } from "../api/client";

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

  const handleChangeCustomer = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrors([]);

    const orderPayload = {
      customer,
      pickup_datetime: new Date(pickupDatetime).toISOString(),
      items: cartItems,
    };

    try {
      const preview = await previewOrder(orderPayload);
      if (!preview.is_valid) {
        setStatus("error");
        setErrors(preview.errors);
        return;
      }

      const order = await createOrder(orderPayload);
      setStatus("success");
      onOrderCreated(order);
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
      {status === "success" && <p>Order created successfully! 🎉</p>}
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

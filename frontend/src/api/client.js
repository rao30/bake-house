const API_BASE_URL = "http://localhost:8000";

export async function fetchProductConfig() {
  const res = await fetch(`${API_BASE_URL}/config/products`);
  if (!res.ok) throw new Error("Failed to load product config");
  return res.json();
}

export async function previewOrder(order) {
  const res = await fetch(`${API_BASE_URL}/orders/preview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error((data.detail && data.detail.join(", ")) || "Validation error");
  }
  return res.json();
}

export async function createOrder(order) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error((data.detail && data.detail.join(", ")) || "Order error");
  }
  return res.json();
}

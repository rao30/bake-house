const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || "http://localhost:8000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

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
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(order),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error((data.detail && data.detail.join(", ")) || "Order error");
  }
  return res.json();
}

export async function checkout(order) {
  const res = await fetch(`${API_BASE_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(order),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error((data.detail && data.detail.join(", ")) || "Checkout error");
  }
  return res.json();
}

export async function confirmPayment(orderId) {
  const res = await fetch(`${API_BASE_URL}/payments/${orderId}/confirm`, {
    method: "POST",
    headers: { ...getAuthHeaders() },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Confirm payment error");
  }
  return res.json();
}

export async function googleLogin(idToken) {
  const res = await fetch(`${API_BASE_URL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: idToken }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Google auth failed");
  }
  return res.json();
}

export async function fetchMe() {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { ...getAuthHeaders() },
  });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
}

export async function fetchMyOrders() {
  const res = await fetch(`${API_BASE_URL}/orders/me`, {
    headers: { ...getAuthHeaders() },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Failed to fetch orders");
  }
  return res.json();
}

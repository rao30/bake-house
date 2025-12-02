import { useEffect, useState } from "react";
import { googleLogin, fetchMe } from "../api/client";

const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

export default function AuthPanel({ onAuthChange }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const clientId = import.meta?.env?.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    fetchMe()
      .then((u) => {
        setUser(u);
        onAuthChange({ user: u, token });
      })
      .catch(() => {
        localStorage.removeItem("authToken");
      });
  }, [onAuthChange]);

  useEffect(() => {
    if (!clientId) return;

    const existing = document.querySelector(`script[src="${GOOGLE_SCRIPT_SRC}"]`);
    if (existing) return;

    const script = document.createElement("script");
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      if (!window.google) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          if (response.credential) {
            await handleCredential(response.credential);
          }
        },
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin"),
        { theme: "outline", size: "large" }
      );
    };
    document.body.appendChild(script);
  }, [clientId]);

  const handleCredential = async (credential) => {
    setStatus("loading");
    setError(null);
    try {
      const res = await googleLogin(credential);
      localStorage.setItem("authToken", res.access_token);
      setUser(res.user);
      onAuthChange({ user: res.user, token: res.access_token });
      setStatus("authenticated");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setStatus("idle");
    onAuthChange({ user: null, token: null });
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Account</h3>
      {user ? (
        <div>
          <p>Signed in as {user.name || user.email}</p>
          <button onClick={handleLogout}>Sign out</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {clientId ? (
            <div id="google-signin" />
          ) : (
            <p style={{ color: "#d97706" }}>
              Set <code>VITE_GOOGLE_CLIENT_ID</code> to enable Google sign-in.
            </p>
          )}
          {status === "error" && <p style={{ color: "red" }}>{error}</p>}
          {status === "loading" && <p>Signing in...</p>}
        </div>
      )}
    </div>
  );
}

import { useEffect } from "react";

function Success() {
  useEffect(() => {
    const saveOrder = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      if (!sessionId || cart.length === 0) return;

      await fetch("http://localhost:2020/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          cart,
        }),
      });

      localStorage.removeItem("cart");
    };

    saveOrder();
  }, []);

  return (
    <main className="status-page">
      <h1>Payment Successful 🎉</h1>
      <p>Thank you for your purchase. We’ll be in touch soon.</p>

      <a href="/">Back to Home</a>
    </main>
  );
}

export default Success;

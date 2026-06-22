import { useEffect, useState } from "react";

type Order = {
  _id: string;
  customerEmail: string;
  total: number;
  paymentStatus: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("http://localhost:2020/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="orders-page">
      <h1>Orders</h1>

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <h3>{order.customerEmail}</h3>
          <p>
            <strong>Total:</strong> ${order.total}
          </p>
          <p>
            <strong>Status:</strong> {order.paymentStatus}
          </p>

          {order.items.map((item, index) => (
            <p key={index}>
              {item.name} - ${item.price} x {item.quantity}
            </p>
          ))}
        </div>
      ))}

      <a href="/">Back to Home</a>
    </main>
  );
}

export default Orders;

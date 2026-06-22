import { useEffect, useState } from "react";

type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    fetch("http://localhost:2020/api/contact-messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="orders-page">
      <h1>Contact Messages</h1>

      {messages.map((message) => (
        <div className="order-card" key={message._id}>
          <h3>{message.name}</h3>
          <p>
            <strong>Email:</strong> {message.email}
          </p>
          <p>
            <strong>Message:</strong> {message.message}
          </p>
        </div>
      ))}

      <a href="/">Back to Home</a>
    </main>
  );
}

export default ContactMessages;
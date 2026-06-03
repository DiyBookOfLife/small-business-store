import { useEffect, useState } from "react";
import "./App.css";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    fetch("http://localhost:2020/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:2020/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);

    setSuccess("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };
  const removeFromCart = (indexToRemove: number) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const handleCheckout = async () => {
    localStorage.setItem("cart", JSON.stringify(cart));

    const response = await fetch(
      "http://localhost:2020/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      },
    );

    const data = await response.json();

    window.location.href = data.url;
  };
  return (
    <>
      <header>
        <h1>SmallBiz</h1>

        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#cart">Cart</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="home">
        <h2>Helping Small Businesses Grow Online</h2>
        <p>
          Professional websites, online stores, and appointment booking
          solutions.
        </p>
        <button>Get Started</button>
      </section>

      <section id="services">
        <h2>Services</h2>

        <div className="cards">
          {products.map((product) => (
            <div className="card" key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>

              <button onClick={() => addToCart(product)}>Add To Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section id="cart">
        <h2>Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index}>
                <p>
                  {item.name} - ${item.price}
                </p>

                <button onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            ))}

            <h3>Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</h3>

            <button onClick={handleCheckout}>Checkout</button>
          </>
        )}
      </section>

      <section id="contact">
        <h2>Contact Us</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Tell us about your project"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Send Message</button>

          {success && <p>{success}</p>}
        </form>
      </section>
    </>
  );
}

export default App;

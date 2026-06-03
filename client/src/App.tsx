import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
  };

  return (
    <>
      <header>
        <h1>SmallBiz</h1>

        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="home">
        <h2>Helping Small Businesses Grow Online</h2>
        <p>Professional websites, online stores, and appointment booking solutions.</p>
        <button>Get Started</button>
      </section>

      <section id="services">
        <h2>Services</h2>

        <div className="cards">
          <div className="card">
            <h3>Business Website</h3>
            <p>$1,500</p>
          </div>

          <div className="card">
            <h3>E-Commerce Store</h3>
            <p>$2,500+</p>
          </div>

          <div className="card">
            <h3>Monthly Maintenance</h3>
            <p>$150/month</p>
          </div>
        </div>
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
        </form>
      </section>
    </>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Orders from "./pages/Orders";
import ContactMessages from "./pages/ContactMessages";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contact-messages" element={<ContactMessages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
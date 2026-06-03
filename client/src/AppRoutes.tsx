import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
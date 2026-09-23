import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./Components/AuthPage";
import Home from "./Components/Home";
import Products from "./Components/Products";
import AboutUs from "./Components/AboutUs";
import ProductCheckout from "./Components/ProductCheckout";
import { createClient } from "@supabase/supabase-js";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" replace />;
}

function App() {


  // CONNECTION TO SUPABASE
  const supabase = createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
  

  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" element={<RootRedirect />} /> */}
          <Route path="/signup" element={<AuthPage initialMode="signup" />} />
          <Route path="/login" element={<AuthPage initialMode="login" />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/Products" element={<Products />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/checkout" element={<ProductCheckout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

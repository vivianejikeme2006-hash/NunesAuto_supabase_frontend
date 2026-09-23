import React from 'react';
import AuthPage from "./Components/AuthPage";
import Home from "./Components/Home";
import Products from "./Components/Products";
import AboutUs from "./Components/AboutUs";
import ProductCheckout from "./Components/ProductCheckout";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { supabase } from "./Components/SupabaseConnection"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return user ? children : <Navigate to="/login" replace />;
// }

function App() {


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
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <ProductCheckout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

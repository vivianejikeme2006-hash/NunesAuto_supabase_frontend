import React from 'react';
import AuthPage from "./Components/AuthPage";
import Home from "./Components/Home";
import Products from "./Components/Products";
import AboutUs from "./Components/AboutUs";
import ProductCheckout from "./Components/ProductCheckout";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import UserProfile from './Components/UserProfile';
import AdminDashboard from "./Pages/AdminDashboard"
import Order from "./Pages/Order";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<AuthPage initialMode="signup" />} />
          <Route path="/login" element={<AuthPage initialMode="login" />} />
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/About" element={<AboutUs />} />
          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          <Route
            path="/Order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            } />


            {/* NAVBAR ICONS */}
          <Route path="/UserProfile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <ProductCheckout />
              </ProtectedRoute>
            } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

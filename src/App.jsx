import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from "./Components/AuthPage"
import Home from "./Components/Home"

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" replace />;
}

function RootRedirect() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/signup" element={<AuthPage initialMode="signup" />} />
          <Route path="/login" element={<AuthPage initialMode="login" />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
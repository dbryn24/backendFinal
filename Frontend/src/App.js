import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import { isAuthenticated } from "./utils/authUtils"; // Import the auth utility

// Protected route component
const PrivateRoute = ({ children }) => {
  // Use the isAuthenticated function from authUtils
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <Routes>
            {/* Redirect default ("/") to /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
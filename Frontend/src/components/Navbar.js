import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          MyApp
        </Link>
        <Link to="/login" className="text-gray-600 hover:text-gray-800">
          Login
        </Link>
      </div>
    </nav>
  );
}

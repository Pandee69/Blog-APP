import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar" style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontWeight: "700", color: "#fff" }}>RentalApp</div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/add-property">Add Property</Link>
        <Link to="/dashboard">Dashboard</Link>
        {user ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
        <button onClick={toggleTheme}>
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

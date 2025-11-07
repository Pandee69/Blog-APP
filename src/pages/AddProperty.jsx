import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", location: "", price: "", image: "" });

  useEffect(() => {
    if (!user) {
      alert("Please login first to add a property!");
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("properties")) || [];
    const newProperty = { ...form, id: Date.now(), user: user.email };
    localStorage.setItem("properties", JSON.stringify([...stored, newProperty]));
    alert("Property added successfully!");
    navigate("/");
  };

  if (!user) return null; // prevent rendering form if not logged in

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input type="text" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
        <input type="text" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />
        <input type="number" placeholder="Price per night" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
        <input type="text" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} required />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [form, setForm] = useState({ checkin: "", checkout: "", guests: 1 });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("properties")) || [];
    const prop = stored.find(p => p.id === Number(id));
    setProperty(prop);
  }, [id]);

  if (!property) return <p style={{ padding: "20px" }}>Property not found</p>;

  const handleBooking = e => {
  e.preventDefault();
  if (!user) {
    alert("Please login first to book a property!");
    navigate("/login");
    return;
  }
  const stored = JSON.parse(localStorage.getItem("bookings")) || [];
  const newBooking = { ...form, property, user: user.email };
  localStorage.setItem("bookings", JSON.stringify([...stored, newBooking]));
  alert("Booking confirmed!");
  navigate("/dashboard");
};

 


  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <img src={property.image} alt={property.title} style={{ width: "100%", borderRadius: "12px", marginBottom: "16px" }} />
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>Location: {property.location}</p>
      <p>Price: ${property.price}/night</p>
      <form onSubmit={handleBooking}>
        <label>Check-in:</label>
        <input type="date" value={form.checkin} onChange={e => setForm({ ...form, checkin: e.target.value })} required />
        <label>Check-out:</label>
        <input type="date" value={form.checkout} onChange={e => setForm({ ...form, checkout: e.target.value })} required />
        <label>Guests:</label>
        <input type="number" min="1" value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} required />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

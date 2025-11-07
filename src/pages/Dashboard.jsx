import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const savedProperties = JSON.parse(localStorage.getItem("properties")) || [];
    setBookings(savedBookings);
    setProperties(savedProperties);
  }, []);

  const handleCancelBooking = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
      localStorage.setItem("bookings", JSON.stringify(updated));
      alert("Booking cancelled successfully!");
    }
  };

  const handleReset = () => {
    if (window.confirm("This will clear all properties and bookings. Continue?")) {
      localStorage.removeItem("bookings");
      localStorage.removeItem("properties");
      alert("Dashboard data has been reset!");
      window.location.reload();
    }
  };

  return (
    <div className="dashboard-container">
      <h2>📊 Your Dashboard</h2>

      <div className="dashboard-actions">
        <button onClick={handleReset} className="reset-btn">Reset Data</button>
      </div>

      <div className="dashboard-section">
        <h3>Your Bookings</h3>
        {bookings.length === 0 ? (
          <p className="empty-text">No bookings yet.</p>
        ) : (
          <div className="card-grid">
            {bookings.map((booking) => (
              <div className="card" key={booking.id}>
                <h4>{booking.title}</h4>
                <p><strong>Check-in:</strong> {booking.checkIn}</p>
                <p><strong>Check-out:</strong> {booking.checkOut}</p>
                <p><strong>Guests:</strong> {booking.guests}</p>
                <button onClick={() => handleCancelBooking(booking.id)}>Cancel</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <h3>Your Properties</h3>
        {properties.length === 0 ? (
          <p className="empty-text">You haven’t added any properties yet.</p>
        ) : (
          <div className="card-grid">
            {properties.map((property) => (
              <div className="card" key={property.id}>
                <img src={property.image} alt={property.title} />
                <h4>{property.title}</h4>
                <p>{property.location}</p>
                <p><strong>₹{property.price}</strong> / night</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

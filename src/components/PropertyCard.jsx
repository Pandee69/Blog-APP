import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <div className="card">
      <img
        src={property.image}
        alt={property.title}
        style={{ width: "100%", borderRadius: "12px", height: "180px", objectFit: "cover" }}
      />
      <h3>{property.title}</h3>
      <p>{property.location}</p>
      <p>${property.price}/night</p>
      <Link to={`/property/${property.id}`}>
        <button style={{ width: "100%" }}>Book Now</button>
      </Link>
    </div>
  );
}

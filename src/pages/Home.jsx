// import React, { useState } from "react";

// export default function Home() {
//   const [location, setLocation] = useState("");
//   const [price, setPrice] = useState("");
//   const [availability, setAvailability] = useState("");

//   const handleSearch = () => {
//     alert("Searching for properties...");
//   };

//   return (
//     <div className="home-container">
//       <h2>Find Your Perfect Property</h2>

//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Enter location..."
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Max price..."
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />

//         <select
//           value={availability}
//           onChange={(e) => setAvailability(e.target.value)}
//         >
//           <option value="">Select Availability</option>
//           <option value="available">Available</option>
//           <option value="booked">Booked</option>
//         </select>

//         <button onClick={handleSearch}>Search</button>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [properties, setProperties] = useState([]);

  const allProperties = [
    { id: 1, name: "Sunset Villa", location: "Miami", price: 2000, availability: "available" },
    { id: 2, name: "Ocean View", location: "LA", price: 1500, availability: "booked" },
    { id: 3, name: "Mountain Retreat", location: "Denver", price: 1800, availability: "available" },
  ];

  const handleSearch = () => {
    const filtered = allProperties.filter(
      (p) =>
        (location ? p.location.toLowerCase().includes(location.toLowerCase()) : true) &&
        (price ? p.price <= price : true) &&
        (availability ? p.availability === availability : true)
    );
    setProperties(filtered);
  };

  return (
    <div className="home-container">
      <h2>Find Your Perfect Property</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max price..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Select Availability</option>
          <option value="available">Available</option>
          <option value="booked">Booked</option>
        </select>

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Show booking details */}
      <div className="results">
        {properties.length > 0 ? (
          properties.map((p) => (
            <div key={p.id} className="property-card">
              <h3>{p.name}</h3>
              <p>Location: {p.location}</p>
              <p>Price: ${p.price}</p>
              <p>Status: {p.availability}</p>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
}

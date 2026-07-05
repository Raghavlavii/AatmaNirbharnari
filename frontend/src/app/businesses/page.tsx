"use client";

import { useEffect, useState } from "react";

interface Business {
  _id: string;
  businessName: string;
  category: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  owner?: {
    fullName: string;
    email: string;
  };
}

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchBusinesses();
  }, [search, category]);

  const fetchBusinesses = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/business?search=${search}&category=${category}`
      );

      const data = await response.json();

      if (data.success) {
        setBusinesses(data.businesses);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        All Businesses
      </h1>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Search business..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
          }}
        >
          <option>All</option>
          <option>Fashion</option>
          <option>Food</option>
          <option>Beauty</option>
          <option>Education</option>
          <option>Handicrafts</option>
        </select>
      </div>

      {businesses.length === 0 ? (
        <p>No businesses found.</p>
      ) : (
        businesses.map((business) => (
          <div
            key={business._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{business.businessName}</h2>

            <p>
              <strong>Category:</strong> {business.category}
            </p>

            <p>
              <strong>Description:</strong> {business.description}
            </p>

            <p>
              <strong>Location:</strong> {business.location}
            </p>

            <p>
              <strong>Phone:</strong> {business.phone}
            </p>

            <p>
              <strong>Email:</strong> {business.email}
            </p>

            <p>
              <strong>Website:</strong>{" "}
              {business.website || "N/A"}
            </p>

            <p>
              <strong>Owner:</strong>{" "}
              {business.owner?.fullName || "Unknown"}
            </p>

            <button
              onClick={() => {
                window.location.href = `/businesses/${business._id}`;
              }}
              style={{
                marginTop: "15px",
                padding: "10px 16px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
}
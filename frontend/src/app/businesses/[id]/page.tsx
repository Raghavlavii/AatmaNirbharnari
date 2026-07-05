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

export default function BusinessDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [business, setBusiness] = useState<Business | null>(null);

  useEffect(() => {
    const loadBusiness = async () => {
      const { id } = await params;

      try {
        const response = await fetch(
          `http://localhost:5000/api/business/${id}`
        );

        const data = await response.json();

        if (data.success) {
          setBusiness(data.business);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadBusiness();
  }, [params]);

  if (!business) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "12px",
      }}
    >
      <h1>{business.businessName}</h1>

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
        <strong>Website:</strong> {business.website || "N/A"}
      </p>

      <p>
        <strong>Owner:</strong> {business.owner?.fullName}
      </p>
    </div>
  );
}
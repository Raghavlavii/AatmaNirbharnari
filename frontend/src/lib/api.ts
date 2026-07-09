// Central API configuration
// In production, reads from NEXT_PUBLIC_API_URL env var set on Vercel
// In development, falls back to localhost:5000
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

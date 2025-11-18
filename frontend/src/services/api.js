const API_URL = "https://your-backend-url.onrender.com";

export const fetchReviews = async () => {
  const res = await fetch(`${API_URL}/api/reviews`);
  return res.json();
};

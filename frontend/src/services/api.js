const API_URL = "https://whatsapp-product-review-collector.onrender.com";

export const fetchReviews = async () => {
  const res = await fetch(`${API_URL}/api/reviews`);
  return res.json();
};

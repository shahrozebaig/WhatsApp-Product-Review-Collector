import React, { useEffect, useState } from "react";
import { fetchReviews } from "./services/api";
import ReviewsList from "./components/ReviewsList";

function App() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews().then((data) => setReviews(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>WhatsApp Product Reviews</h1>
      <ReviewsList reviews={reviews} />
    </div>
  );
}

export default App;

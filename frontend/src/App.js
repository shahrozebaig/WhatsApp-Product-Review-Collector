import React, { useEffect, useState } from "react";
import { fetchReviews } from "./services/api";
import ReviewsList from "./components/ReviewsList";
import "./App.css";

function App() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews().then((data) => setReviews(data));
  }, []);

  return (
    <div className="app-root">

      {/* Floating lines background */}
      <div className="floating-lines"></div>

      {/* Hero Title */}
      <header className="hero">
        <h1 className="split">
          <span>R</span><span>e</span><span>v</span><span>i</span>
          <span>e</span><span>w</span><span>W</span><span>a</span>
          <span>v</span><span>e</span>
        </h1>

        <div className="scroll-box">
          <div className="scroll-text">
            Live WhatsApp Product Reviews • Live WhatsApp Product Reviews • Live WhatsApp Product Reviews •
          </div>
        </div>
      </header>

      {/* Table */}
      <ReviewsList reviews={reviews} />

      {/* Footer */}
      <footer className="footer">Made with ❤️ ReviewWave</footer>
    </div>
  );
}

export default App;

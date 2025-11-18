import React from "react";
import "./ReviewsList.css";

function ReviewsList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <div className="no-reviews">No reviews yet 😄</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="reviews-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Product</th>
            <th>Review</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((r) => (
            <tr key={r.id}>
              <td>{r.user_name}</td>
              <td>{r.product_name}</td>
              <td>{r.product_review}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewsList;

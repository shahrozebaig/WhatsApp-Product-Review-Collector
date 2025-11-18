import React from "react";

function ReviewsList({ reviews }) {
  return (
    <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
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
  );
}

export default ReviewsList;

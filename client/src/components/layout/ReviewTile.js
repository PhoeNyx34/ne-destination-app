import React from "react";

const ReviewTile = ({ title, content, rating }) => {
  return (
    <div className="tile-style cell small-6 not-nav">
      <h4>{title}</h4>
      <p className="form-label">{content}</p>
      <p className="form-label">Rating: {rating}</p>
    </div>
  );
};

export default ReviewTile;

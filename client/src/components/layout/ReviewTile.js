import React from "react";

const ReviewTile = ({ title, content, rating }) => {
  return (
    <>
      <h4>{title}</h4>
      <p className="form-label">{content}</p>
      <p className="form-label">Rating: {rating}</p>
    </>
  );
};

export default ReviewTile;

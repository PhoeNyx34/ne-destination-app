import React from "react";

const ReviewTile = ({ title, content, rating }) => {
  return (
    <>
      <h3>{title}</h3>
      <p>Rating: {rating}</p>
      <p>{content}</p>
    </>
  );
};

export default ReviewTile;

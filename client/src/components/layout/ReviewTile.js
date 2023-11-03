import React from "react"

const ReviewTile = ({ title, reviewContent, rating }) => {
  return (
    <>
      <h3>{title}</h3>
      <p>{rating}</p>
      <p>{reviewContent}</p>
    </>
  );
};
export default ReviewTile
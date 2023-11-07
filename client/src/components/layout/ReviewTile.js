import React from "react"

const ReviewTile = ({ title, rating, content }) => {
  
  return (
    <>
      <h3>{title}</h3>
      <p>Rating: {rating}</p>
      <p>{content}</p>
    </>
  );
};

export default ReviewTile
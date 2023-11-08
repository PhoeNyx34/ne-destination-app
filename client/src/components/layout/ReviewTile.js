import React from "react";
import DeleteReview from "./DeleteReview";

const ReviewTile = ({
  title,
  content,
  rating,
  destination,
  setDestination,
  reviewId,
  user,
  reviewUserId,
}) => {
  return (
    <>
      <h3>{title}</h3>
      <p>Rating: {rating}</p>
      <p>{content}</p>
      {reviewUserId === user?.id ? (
        <DeleteReview
          reviewId={reviewId}
          destination={destination}
          setDestination={setDestination}
        />
      ) : null}
    </>
  );
};

export default ReviewTile;

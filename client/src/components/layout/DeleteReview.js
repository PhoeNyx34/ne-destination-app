import React from "react";

const DeleteReview = (props) => {
  const reviewId = props.reviewId;
  const destination = props.destination;

  const deleteReview = async () => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      // const body = await response.json();
      const updatedReviews = destination.reviews.filter((review) => review.id !== reviewId);

      props.setDestination({ ...destination, reviews: updatedReviews });
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  return <div onClick={deleteReview}>Delete</div>;
};

export default DeleteReview;

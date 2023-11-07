import React from "react";
const DeleteReview = (props) => {
  const { id, destinationId } = props;

  const deleteReview = async () => {
    try {
      await fetch(`/api/v1/destinations/${destinationId}/reviews/${id}`, {
        method: "DELETE",
      });
      alert("Delete successful");
    } catch {}
  };
};

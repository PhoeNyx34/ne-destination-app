import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReviewTile from "./ReviewTile";

const DestinationShow = (props) => {
  const [destination, setDestination] = useState({
    reviews: [],
  });

  const { id, name, type, location, description, website, reviews } = destination;
  const { id: destinationId } = useParams();

  const getDestination = async () => {
    try {
      const response = await fetch(`/api/v1/destinations/${destinationId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      const destination = body.destination;
      setDestination(destination);
    } catch (err) {
      console.error(`Error in fetch ${err.message}`);
    }
  };

  useEffect(() => {
    getDestination();
  }, []);

  const reviewsList = reviews.map((reviewItem) => {
    return (
      <ReviewTile
        key={reviewItem.id}
        title={reviewItem.title}
        content={reviewItem.content}
        rating={reviewItem.rating}
      />
    );
  });

  return (
    <div className="grid-container">
      <h1 className="form-title">{name}</h1>
      <h5 className="form-label">{description}</h5>
      <ul className="form-label">
        <li>{type}</li>
        <li>{location}</li>
        <li>{website}</li>
      </ul>
      <h1 className="form-title">Reviews</h1>
      {props.user ? (
        <Link to={`/destinations/${destination.id}/new-review`}>Submit a New Review</Link>
      ) : (
        <Link to="/user-sessions/new">Please sign in to leave a review</Link>
      )}
      {reviewsList}
    </div>
  );
};

export default DestinationShow;

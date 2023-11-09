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
        reviewId={reviewItem.id}
        title={reviewItem.title}
        content={reviewItem.content}
        rating={reviewItem.rating}
        destination={destination}
        setDestination={setDestination}
        user={props.user}
        reviewUserId={reviewItem.userId}
      />
    );
  });

  return (
    <div className="destination">
      <h1>{name}</h1>
      <p>{description}</p>
      <ul>
        <li>{type}</li>
        <li>{location}</li>
        <li>{website}</li>
      </ul>
      {props.user ? (
        <Link to={`/destinations/${destination.id}/new-review`}>Submit a New Review</Link>
      ) : (
        <Link to="/user-sessions/new">Please sign in to leave a review</Link>
      )}
      <h2>Reviews:</h2>
      {reviewsList}
    </div>
  );
};

export default DestinationShow;

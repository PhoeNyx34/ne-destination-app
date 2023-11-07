import React, { useState, useEffect } from "react";
import ReviewTile from "./ReviewTile";

const DestinationShow = (props) => {
  const [destination, setDestination] = useState({
    reviews: [],
  });

  const { id, name, type, location, description, website, reviews } = destination;

  const getDestination = async () => {
    const destinationId = props.match.params.id;
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
    <div className="destination">
      <h1>{name}</h1>
      <p>{description}</p>
      <ul>
        <li>{type}</li>
        <li>{location}</li>
        <li>{website}</li>
      </ul>
      <h2>Reviews: </h2>
      {reviewsList}
    </div>
  );
};

export default DestinationShow;

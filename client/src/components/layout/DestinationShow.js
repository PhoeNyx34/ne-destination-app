import React, { useState, useEffect } from "react";

const DestinationShow = (props) => {
  const [destination, setDestination] = useState({
    id: "",
    name: "",
    type: "",
    location: "",
    description: "",
    website: "",
  });
  const { id, name, type, location, description, website } = destination;
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
  return (
    <>
      <div className="destination">
        <h1>{name}</h1>
        <p>{description}</p>
        <ul>
          <li>{type}</li>
          <li>{location}</li>
          <li>{website}</li>
        </ul>
      </div>

      <div className="reviews">
        <h1>Reviews:</h1>
      </div>
    </>
  );
};
export default DestinationShow;

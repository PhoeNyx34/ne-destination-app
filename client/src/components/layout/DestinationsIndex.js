import React, { useState, useEffect } from "react";
import DestinationTile from "./DestinationTile";

const DestinationsIndex = (props) => {
  const [destinations, setDestinations] = useState([]);

  const getDestinations = async () => {
    try {
      const response = await fetch("/api/v1/destinations");
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      const newDestinations = body.destinations;
      setDestinations(newDestinations);
    } catch (err) {
      console.error(`Error in Fetch, ${err.message}`);
    }
  };

  useEffect(() => {
    getDestinations();
  }, []);

  const destinationTiles = destinations.map((destination) => {
    return <DestinationTile key={destination.id} destination={destination} />;
  });

  return (
    <>
      <h1>Destinations!</h1>
      {destinationTiles}
    </>
  );
};

export default DestinationsIndex;

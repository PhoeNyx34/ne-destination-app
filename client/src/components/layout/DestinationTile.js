import React from "react";
import { Link } from "react-router-dom";

const DestinationTile = (props) => {
  const { id, name, type, location, website, description } = props.destination;

  return (
    <>
      <h3>{name}</h3>
      <p>{description}</p>
      <ul>
        <li>{type}</li>
        <li>{location}</li>
        <li>{website}</li>
      </ul>
      <Link to={`/destinations/${id}`}>Visit</Link>
    </>
  );
};

export default DestinationTile;

import React from "react";

const DestinationTile = (props) => {
  const { name, type, location, website, description } = props.destination;

  return (
    <>
      <h3>{name}</h3>
      <p>{description}</p>
      <ul>
        <li>{location}</li>
        <li>{type}</li>
        <li>{website}</li>
      </ul>
    </>
  );
};

export default DestinationTile;

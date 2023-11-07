import React from "react";
import { Link } from "react-router-dom";

const DestinationTile = (props) => {
  const { id, name, type, location, website, description } = props.destination;

  return (
    <div className="cell small-4">
          <h3 className="tile-name">{name}</h3>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.r2DImRe3YVc7XHVK9zQZ7QHaHa%26pid%3DApi&f=1&ipt=a6711f81292f46bf83465c3078b4a23f5b50cd21d8b263d48a04241bc5146248&ipo=images" alt="beach-icon" className="icon"/>
          <p>Rating will go here</p>
          <p className="tile-description">{description}</p>
          <p className="tile-list location">{location}</p>
          <Link to={`/destinations/${id}`}>Learn more and see reviews!</Link>
        
    </div>
  );
};

export default DestinationTile;

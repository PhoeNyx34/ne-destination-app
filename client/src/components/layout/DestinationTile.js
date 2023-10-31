import React from "react"

const DestinationTile = (props) => {
    const { name, destinationType, location, website, description } = props.destination

    return (
        <>
            <h3>{name}</h3>
            <p>{description}</p>
            <ul>
                <li>{location}</li>
                <li>{destinationType}</li>
                <li>{website}</li>
            </ul>
        </>
    )
}

export default DestinationTile
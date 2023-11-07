import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import DestinationTile from "./DestinationTile";

const DestinationsIndex = (props) => {

    const [destinations, setDestinations] = useState([])

    const getDestinations = async () => {
        try {
            const response = await fetch("/api/v1/destinations")
            if (!response.ok) {
                const errorMessage = (`${response.status} ${response.statusText}`)
                const error = new Error(errorMessage)
                throw(error)
            }
            const body = await response.json()
            const newDestinations = body.destinations
            setDestinations(newDestinations)
        } catch (err) {
            console.error(`Error in Fetch, ${err.message}`)
        }
    }

    useEffect(() => {
        getDestinations()
    }, [])

    const destinationTiles = destinations.map((destination) => {
        return (
                <DestinationTile key={destination.id} destination={destination}/>
        )
    })

    

    return (
        <div className="grid-container">
            <div className="grid-x grid-margin-x">
                <h1 className="page-header cell small-9">Beaches!</h1>
                <Link to="/destinations/new" className="new-destination custom-button cell auto">Add a new beach</Link>
                {destinationTiles}
            </div>
        </div>
    )

}

export default DestinationsIndex
import React, { useState, useEffect } from "react";
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
            console.log(newDestinations)
            setDestinations(
                ...destinations,
                newDestinations
            )
        } catch (err) {
            console.error(`Error in Fetch, ${err.message}`)
        }
    }

    useEffect(() => {
        getDestinations()
    }, [])

    console.log("destinations:", destinations)

    const destinationTiles = destinations.map((destination) => {
        return (
            <p key={destination.id}>
                <DestinationTile destination={destination}/>
            </p>
        )
    })

    

    return (
        <div>
            <h1>Destinations!</h1>
            {destinationTiles}
        </div>
    )

}

export default DestinationsIndex
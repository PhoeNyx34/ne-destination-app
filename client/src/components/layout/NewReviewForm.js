import React, { useState } from "react"
import { useParams, Redirect } from "react-router-dom"
import translateServerErrors from "../../services/translateServerErrors"
import ErrorList from "./ErrorList"

const NewReviewForm = (props) => {
    const { id } = useParams()
    
    const [newReview, setNewReview] = useState({
        title: "",
        rating: "",
        content: ""
    })
    
    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const addNewReview = async () => {
        try {
            const response = await fetch(`/api/v1/destinations/${id}/reviews`, 
                {method: "POST", 
                headers: new Headers({"Content-Type": "application/json"}), 
                body: JSON.stringify(newReview)
                }
            )
            if (!response.ok) {
                if (response.status === 422) {
                    const body = await response.json()
                    const newErrors = translateServerErrors(body.errors)
                    return setErrors(newErrors)
                } else {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw (error)
                }
            }
            const body = await response.json()
            setShouldRedirect(true)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }
    
    const handleSubmit = event => {
        event.preventDefault()
        addNewReview()
    }

    if (shouldRedirect) {
        return <Redirect push to={`/destinations/${id}`}/>
    }

    const handleInputChange = (event) => {
        setNewReview({
            ...newReview,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    return (
        <>
            <h1>Submit a Review</h1>
            <ErrorList errors={errors} />
            <form onSubmit={handleSubmit}>
                <input name="title" value={newReview.title} type="text" placeholder="Add a Review Title!" onChange={handleInputChange}/>
                <input name="content" value={newReview.content} type="text" placeholder="Add your review content here!"
                onChange={handleInputChange}/>
                <fieldset>
                    <legend>Please select your rating:</legend>
                        <div className="rating-buttons">
                            <input 
                                id="rating1" 
                                type="radio" 
                                name="rating" 
                                value="1"
                                onChange={handleInputChange}
                                checked={newReview.rating === "1"}
                            />
                            <label htmlFor="rating1">1</label>
                            <input 
                                id="rating2" 
                                type="radio" 
                                name="rating" 
                                value="2" 
                                onChange={handleInputChange}
                                checked={newReview.rating === "2"}
                                />
                            <label htmlFor="rating2">2</label>
                            <input 
                                id="rating3" 
                                type="radio" 
                                name="rating" 
                                value="3" 
                                onChange={handleInputChange}
                                checked={newReview.rating === "3"}
                                />
                            <label htmlFor="rating3">3</label>
                            <input 
                                id="rating4" 
                                type="radio" 
                                name="rating" 
                                value="4" 
                                onChange={handleInputChange}
                                checked={newReview.rating === "4"}
                                />
                            <label htmlFor="rating4">4</label>
                            <input 
                                id="rating5" 
                                type="radio" 
                                name="rating" 
                                value="5" 
                                onChange={handleInputChange}
                                checked={newReview.rating === "5"}
                                />
                            <label htmlFor="rating5">5</label>
                        </div>
                    </fieldset>
                <input type="Submit"/>
            </form>
        </>
    )
}

export default NewReviewForm
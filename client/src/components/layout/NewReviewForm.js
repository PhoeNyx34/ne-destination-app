import React, { useState } from "react"
import { useParams } from "react-router-dom"


const NewReviewForm = (props) => {
    const { id } = useParams()
    let ratingValue = ""
    
    const [newReview, setNewReview] = useState({
        userId: props.user.id,
        destinationId: id,
        title: "",
        rating: ratingValue,
        reviewContent: ""
    })

    const handleSubmit = event => {
        event.preventDefault()
        console.log("You've submitted a review!")
        console.log(`Review: ${newReview}`)
    }

    // let buttonValue
    // if (user) {
    //     buttonValue = "Submit a Review"
    // } else {
    //     buttonValue = "Please Log In to Submit a Review"
    // }

    
    const handleInputChange = (event) => {
        setNewReview({
            ...newReview,
            [event.currentTarget.name]: event.currentTarget.value
        })
    } 

    const ratingStars = [...document.getElementsByClassName("rating__star")];
    // const [ selected, setSelected ] = useState(false)

    const executeRating = (stars) => {
        const starClassActive = "rating__star fas fa-star";
        const starClassInactive = "rating__star far fa-star";
        const starsLength = stars.length;
        let i;
            stars.map((star) => {
                star.onclick = () => {
                i = stars.indexOf(star);
                // setNewReview({
                //     ...newReview,
                //     rating: ratingValue
                // })
        
                if (star.className===starClassInactive) {        
                    for (i; i >= 0; --i) stars[i].className = starClassActive;
                } else {
                    for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
                }
                };
            });
        }

    executeRating(ratingStars)

    console.log(newReview)
    return (
        <>

                {/* <div name="rating" value={newReview.rating} type="text">
                </div> */}
            <h1>Submit a Review</h1>

            <form onSubmit={handleSubmit}>
                <div className="rating" name="rating">
                    <i className="rating__star far fa-star"></i>
                    <i className="rating__star far fa-star"></i>
                    <i className="rating__star far fa-star"></i>
                    <i className="rating__star far fa-star"></i>
                    <i className="rating__star far fa-star"></i>
                </div>

                <input name="title" value={newReview.title} type="text" placeholder="Add a Review Title!" onChange={handleInputChange}/>


                <input name="reviewContent" value={newReview.reviewContent} type="text" placeholder="Add your review content here!"
                onChange={handleInputChange}/>
                <input type="Submit"/>
            </form>
        </>
    )
}

export default NewReviewForm
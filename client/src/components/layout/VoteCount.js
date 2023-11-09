import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDownLong, faArrowUpLong } from "@fortawesome/free-solid-svg-icons"




const VoteCount = ({ user, reviewId, voteTotal, userReviewVoteStatus }) => {

    const [voteCounter, setVoteCounter] = useState(voteTotal)
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [voteStatus, setVoteStatus] = useState(userReviewVoteStatus)

    const handleVoteClick = async (event) => {
        let voteObject = {
            reviewId: reviewId,
            voteStatus: null
        }
        if (user) {
            if (event.currentTarget.id === "upVote") {
                voteObject.voteStatus = 1
            } else if (event.currentTarget.id === "downVote") {
                voteObject.voteStatus = -1
            }
            try {
                const response = await fetch('/api/v1/votes', {
                    method: "POST", 
                    headers: new Headers({"Content-type": "application/json"}),
                    body: JSON.stringify({ voteObject: voteObject })
                })
                if (!response.ok) {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                    throw (error)
                }
                const body = await response.json()
                if (body.vote) {
                    if (voteStatus === 1 && body.vote.status === -1) {
                        setVoteCounter(voteCounter - 2)
                    } else if (voteStatus === -1 && body.vote.status === 1) {
                        setVoteCounter(voteCounter + 2)   
                    }

                    if (voteStatus === null) {
                        setVoteCounter(voteCounter + body.vote.status)   
                    }
                    setVoteStatus(body.vote.status)
                } else {
                    if (voteStatus === 1){
                        setVoteCounter(voteCounter - 1)
                    } else {
                        setVoteCounter(voteCounter + 1)
                    }
                    setVoteStatus(null)
                }
            } catch (err) {
                console.error(`Error in fetch: ${err.message}`)
            }

        } else {
            setShouldRedirect(true)
        }
    }

    if (shouldRedirect) {
        <Redirect to="/user-sessions/new"/>
    }

    let upVoteStyle
    let downVoteStyle
    if (voteStatus) {
        if (voteStatus === 1) {
            upVoteStyle = "upvoted"
        } else if (voteStatus === -1) {
            downVoteStyle = "downvoted"
        }
    }

    return (
        <div className="voting-section">
            <FontAwesomeIcon onClick={handleVoteClick} icon={faArrowUpLong} className={`vote-icon ${upVoteStyle}`} value="upVote" id="upVote"/>
            {voteCounter}
            <FontAwesomeIcon onClick={handleVoteClick} icon={faArrowDownLong} className={`vote-icon ${downVoteStyle}`} value="downVote" id="downVote"/>
        </div>
    )
}


export default VoteCount
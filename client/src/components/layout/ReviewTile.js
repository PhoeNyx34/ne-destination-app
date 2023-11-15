import React from "react";
import DeleteReview from "./DeleteReview";
import VoteCount from "./VoteCount";

const ReviewTile = ({ setDestination, reviewId, user, reviewUserId, reviewItem }) => {
  const { id, title, content, rating, destination, voteTotal, userReviewVoteStatus } = reviewItem;

  return (
    <>
      <h3>{title}</h3>
      <p>Rating: {rating}</p>
      <p>{content}</p>
      <VoteCount
        user={user}
        reviewId={id}
        voteTotal={voteTotal}
        userReviewVoteStatus={userReviewVoteStatus}
      />
      {reviewUserId === user?.id ? (
        <DeleteReview
          reviewId={reviewId}
          destination={destination}
          setDestination={setDestination}
          reviewUserId={reviewUserId}
        />
      ) : null}
    </>
  );
};

export default ReviewTile;

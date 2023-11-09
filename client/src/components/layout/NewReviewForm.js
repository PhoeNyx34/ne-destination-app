import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors";
import ErrorList from "./ErrorList";

const NewReviewForm = (props) => {
  const { id } = useParams();

  const [newReview, setNewReview] = useState({
    title: "",
    rating: "",
    content: "",
  });

  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const addNewReview = async () => {
    try {
      const response = await fetch(`/api/v1/destinations/${id}/reviews`, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(newReview),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      }
      const body = await response.json();
      setShouldRedirect(true);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewReview();
  };

  if (shouldRedirect) {
    return <Redirect push to={`/destinations/${id}`} />;
  }

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const ratings = ["1", "2", "3", "4", "5"];

  const radioButtons = ratings.map((rating) => (
    <>
      <input
        id={`rating${rating}`}
        type="radio"
        name="rating"
        value={rating}
        onChange={handleInputChange}
        checked={newReview.rating === rating}
      />
      <label htmlFor={`rating${rating}`}>{rating}</label>
    </>
  ));

  return (
    <>
      <div className="grid-container">
        <h2 className="form-title">Submit a Review</h2>
        <ErrorList errors={errors} />
        <form onSubmit={handleSubmit} className="form-inputField">
          <label className="form-label">Title</label>
          <input
            name="title"
            value={newReview.title}
            type="text"
            // placeholder="Add a Review Title!"
            onChange={handleInputChange}
          />

          <label className="form-label">Your Review</label>
          <input
            className="form-field-multiline"
            name="content"
            value={newReview.content}
            type="text"
            // placeholder="Add your review content here!"
            onChange={handleInputChange}
          />
          <fieldset>
            <legend className="form-label">Please select your rating</legend>
            <div className="rating-buttons">{radioButtons}</div>
          </fieldset>
          <input className="form-submit-button" type="Submit" />
        </form>
      </div>
    </>
  );
};

export default NewReviewForm;

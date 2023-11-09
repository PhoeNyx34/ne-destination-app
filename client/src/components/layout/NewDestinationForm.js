import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors";
import ErrorList from "./ErrorList";

const NewDestinationForm = (props) => {
  const [newDestination, setNewDestination] = useState({
    name: "",
    location: "",
    website: "",
    description: "",
    type: "",
  });

  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const addNewDestination = async () => {
    try {
      const response = await fetch("/api/v1/destinations", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(newDestination),
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

  const handleInputChange = (event) => {
    setNewDestination({
      ...newDestination,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    addNewDestination();
  };

  if (shouldRedirect) {
    return <Redirect push to="/" />;
  }

  return (
    <div className="grid-container">
      <h1 className="form-title">New Destination Form</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleOnSubmit} className="form-label">
        <label>
          Type
          <input
            className="form-input-single
            "
            type="text"
            name="type"
            onChange={handleInputChange}
            value={newDestination.type}
          />
        </label>
        <label>
          {" "}
          Name
          <input
            className="form-input-single"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={newDestination.name}
          />
        </label>
        <label>
          {" "}
          Location
          <input
            className="form-input-single"
            type="text"
            name="location"
            onChange={handleInputChange}
            value={newDestination.location}
          />
        </label>
        <label>
          {" "}
          Website
          <input
            className="form-input-single"
            type="text"
            name="website"
            onChange={handleInputChange}
            value={newDestination.website}
          />
        </label>
        <label>
          {" "}
          Description
          <input
            className="form-input-multi"
            type="text"
            name="description"
            onChange={handleInputChange}
            value={newDestination.description}
          />
        </label>

        <input
          className="form-submit-button "
          type="submit"
          name="Submit"
          value="Add new Destination"
        />
      </form>
    </div>
  );
};

export default NewDestinationForm;

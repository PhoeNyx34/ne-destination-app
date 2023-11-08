import React, { useState, useEffect } from "react";
import _ from "lodash";
import Dropzone from "react-dropzone";

const NewImageForm = ({ user, setCurrentUser }) => {
  const [newImage, setNewImage] = useState(null);

  const addProfilePicture = async (event) => {
    event.preventDefault();
    const newProfilePictureBody = new FormData();
    newProfilePictureBody.append("image", newImage);
    try {
      const response = await fetch(`/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          Accept: "image/jpeg",
        },
        body: newProfilePictureBody,
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const body = await response.json();
      setCurrentUser({ ...user, image: body.user.image });
    } catch (error) {
      console.error(`Error in addProfilePicture Fetch: ${error.message}`);
    }
  };

  let uploadImagePromptText = "Click Or Drag Here To Edit Profile Image";

  if (!_.isEmpty(user.image)) {
    uploadImagePromptText = "Click here to upload image, then click the button below to save!";
  }

  const handleImageUpload = (acceptedImage) => {
    setNewImage(acceptedImage[0]);
  };

  return (
    <form className="dropzone" onSubmit={addProfilePicture}>
      <Dropzone onDrop={handleImageUpload}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>{uploadImagePromptText}</p>
          </div>
        )}
      </Dropzone>
      <input type="submit" value="Save Selected Profile Image" />
    </form>
  );
};

export default NewImageForm;

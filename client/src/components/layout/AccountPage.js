import React, { useState, useEffect } from "react";
import _ from "lodash";
import Dropzone from "react-dropzone";

const AccountPage = (props) => {
 
  const [user, setUser] = useState(props.user); 
  const [profilePicture, setProfilePicture] = useState({}); 
  const handleImageUpload = (acceptedImage) => {
    setProfilePicture({
      ...profilePicture,
      image: acceptedImage[0],
    });
  };

  const addProfilePicture = async () => {
    const newProfilePictureBody = new FormData();
    newProfilePictureBody.append("image", profilePicture.image);
    try {
      const response = await fetch(`/api/v1/users/${profilePicture.id}`, {
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
      setUser({ ...user, image: body.user.image });
    } catch (error) {
      console.error(`Error in addProfilePicture Fetch: ${error.message}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProfilePicture();
  };

  let uploadImagePromptText = "Click Or Drag Here To Edit Profile Image";

  if (!_.isEmpty(profilePicture)) {
    uploadImagePromptText = "Image received. Click button below to save!";
  }

  return (
    <div className="grid-container">
      <h2>Account Details</h2>
      <h5>Username: {user.userName}
      </h5>
      <h5>Email: {user.email}
      </h5>
      <form className="dropzone" onSubmit={handleSubmit}>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                <img width="50px" src={user.image} />
                {uploadImagePromptText}
              </p>
            </div>
          )}
        </Dropzone>
        <input type="submit" value="Save Selected Profile Image" />
      </form>
    </div>
  )
}

export default AccountPage;

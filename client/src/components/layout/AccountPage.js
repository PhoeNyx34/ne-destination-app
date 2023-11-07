import React, { useState, useEffect } from "react";
import _ from "lodash";
import Dropzone from "react-dropzone";

const AccountPage = (props) => {
  const [user, setUser] = useState(props.user);
  const handleImageUpload = (acceptedImage) => {
    setUser({ ...user, image: acceptedImage[0] });
  };

  const addProfilePicture = async () => {
    const newProfilePictureBody = new FormData();
    newProfilePictureBody.append("image", user.image);
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
      setUser({ ...user, image: body.user.image });
    } catch (error) {
      console.log(error);
      console.error(`Error in addProfilePicture Fetch: ${error.message}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProfilePicture();
  };

  let uploadImagePromptText = "Click Or Drag Here To Edit Profile Image";

  if (!_.isEmpty(user.image)) {
    uploadImagePromptText = "Click here to upload image, then click the button below to save!";
  }

  return (
    <div className="grid-container">
      <h2>Account Details</h2>
      <h5>Username: {user.userName}</h5>
      <h5>Email: {user.email}</h5>
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
  );
};

export default AccountPage;

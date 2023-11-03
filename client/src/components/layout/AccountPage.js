import React, { useState, useEffect } from "react";
import _ from "lodash";
import Dropzone from "react-dropzone";

const AccountPage = (props) => {
  //   const { id, email, userName, image } = props.user; {#000,0} note: don't need to deconstruct, can just use props

  const [user, setUser] = useState(props.user); //{#000,0} note: created a new state to update the user fields
  const [profilePicture, setProfilePicture] = useState({}); //{#000,0} note: changed default state of pro pic to null
  //   debugger;

  // const defaultImageSrc = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HHVUf3TYqncgpJXyCMmxyAHaHa%26pid%3DApi&f=1&ipt=93200a074698f6d970d4c1209aca3909d8fc9f313fa825e474633a1e48f2bcea&ipo=images"

  const handleImageUpload = (acceptedImage) => {
    // sets state for the image we want to post
    setProfilePicture({
      ...profilePicture,
      image: acceptedImage[0],
    });

    // If you want to actually show an image previous
    //   right here, you will have to make a post request to the backend and use s3 to upload a temporary image for this user
    //   get the image back from s3, and display it on the page
    //   then when you click Add your new picture, it will make that permanent
    // requires a new post req for the temp image
    //   new state for the temo image (after the post)
    //   new api endpoint that is configured with `uploadImage`
  };

  const addProfilePicture = async () => {
    const newProfilePictureBody = new FormData();
    newProfilePictureBody.append("image", profilePicture.image);
    // console.log(profilePicture.image);
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
      console.log("body", body.user.image);
      setUser({ ...user, image: body.user.image });
    } catch (error) {
      console.error(`Error in addProfilePicture Fetch: ${error.message}`);
    }
  };

  ///handleSubmit needs to handle patch request
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("about to submit");
    addProfilePicture();
  };

  let uploadImagePromptText = "Click Or Drag Here To Edit Profile Image";

  const handleClick = (event) => {
    uploadImagePromptText = "Click Or Drag Here To Edit Profile Image";
  }

  if (!_.isEmpty(profilePicture)) {
    uploadImagePromptText = "Image received. Click button below to save!";
  }

  return (
    <div className="grid-container">
      <h2>Account Details</h2>
      <h5>
        {" "}
        <strong>Username </strong> {user.userName}
      </h5>
      <h5>
        <strong>Email </strong>
        {user.email}
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
        <input type="submit" value="Save Selected Profile Image" onClick={handleClick} />
      </form>

      {/* <p>Your old image in the database </p> */}
    </div>
  );
};

export default AccountPage;

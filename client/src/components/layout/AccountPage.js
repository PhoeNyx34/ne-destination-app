import React, { useState, useEffect } from "react";
import NewImageForm from "./NewImageForm.js";

const AccountPage = ({ user, setCurrentUser }) => {
  return (
    <div className="grid-container">
      <h2>Account Details</h2>
      <h5>Username: {user.userName}</h5>
      <h5>Email: {user.email}</h5>
      <img width="100px" src={user.image} />
      <NewImageForm user={user} setCurrentUser={setCurrentUser} />
    </div>
  );
};

export default AccountPage;

import React from "react";
import "../../css/bootstrap.min.css";
import "./UploaderDetails.css";

const UploaderDetails = ({ username, subscribers, profileImage }) => {
  return (
    <div className="d-flex align-items-center">
      {/* Profile Image */}
      <img
        src={profileImage}
        alt="Uploader's profile"
        className="rounded-circle profile-picture"
        width="50"
        height="50"
      />
      {/* Uploader's Details */}
      <div className="ml-3">
        <h5 className="mb-0 author-name">{username}</h5>
        <small>{subscribers} subscribers</small>
      </div>
    </div>
  );
};

export default UploaderDetails;

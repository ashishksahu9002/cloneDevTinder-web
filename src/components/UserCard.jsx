import React from "react";
import { TEMP_IMG_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, skills } = user;

  return (
    <div className="flex justify-center my-14">
      <div className="card bg-base-400 w-96 shadow-xl">
        <figure>
          <img src={TEMP_IMG_URL} alt="User" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p> {about} </p>
          <p> {skills && skills} </p>

          <div className="card-actions justify-center">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

import React, { useState, useEffect } from "react";
import "./Profile.css";

import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";

import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/apiCalls.js";
import { FiEdit } from "react-icons/fi";
export const Profile = () => {
  const [userProfileData, setUserProfileData] = useState({});

  const userDataRdx = useSelector(userData);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userDataRdx.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getUserProfile(userDataRdx.credentials)
      .then((results) => {
        setUserProfileData(results.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const editProfileDetail = () => {
    navigate(`/profile_edit`);
  };

  return (
    <div className="profileDesign">
      {userProfileData._id !== "" ? (
        <div>
          <div>{userProfileData.profile_img}</div>
          <div>{userProfileData.name}</div>
          <div>{userProfileData.email}</div>
          <div>{userProfileData.phone_number}</div>
          <div
            className="appointmentsButton edit"
            title="Edit appointment"
            onClick={() => editProfileDetail()}
          >
            <FiEdit />
          </div>
        </div>
      ) : (
        <div>CARGANDO</div>
      )}
    </div>
  );
};

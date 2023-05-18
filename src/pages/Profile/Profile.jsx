import React, { useState, useEffect } from "react";
import "./Profile.css";

import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/apiCalls.js";

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

  return (
    <div className="profileDesign">
      {userProfileData._id !== "" ? (
        <div>
          <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
          >
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>{userProfileData.name}</Modal.Title>
              </Modal.Header>

              <Modal.Body className="profileDataModal">
                <div>
                  <a>Name: </a>{userProfileData.name} {userProfileData.lastname}
                </div>
                <div><a>Email: </a> {userProfileData.email}</div>
                <div><a>Phone: </a> {userProfileData.phone_number}</div>
                <div><a>Address: </a> {userProfileData.address}</div>
              </Modal.Body>

              <Modal.Footer>

              </Modal.Footer>
            </Modal.Dialog>
          </div>
        </div>
      ) : (
        <div>CARGANDO</div>
      )}
    </div>
  );
};

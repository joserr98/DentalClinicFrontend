import React, { useState, useEffect } from "react";
import "./Profile.css";

import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/apiCalls.js";
import { Appointment } from "../Appointment/Appointment";
import { FiEdit } from "react-icons/fi";
import { AdminPanelModal } from "../../common/AdminPanelModal/AdminPanelModal";
import { editUser } from "../../services/apiCalls";

export const Profile = () => {

  const navigate = useNavigate();
  const userDataRdx = useSelector(userData);
  const [userProfileData, setUserProfileData] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleOpenModalEdit = (user) => {
    setSelectedUser(user);
    setEditedData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      address: user.address,
      phone_number: user.phone_number,
      role: user.role,
    });
    setShowModalEdit(true);
  };

  const editUserFunction = () => {
    if (editedData.password === undefined) {
      setShowToast(true);
    }
    editUser(userDataRdx.credentials, selectedUser, editedData)
      .then(() => {
        setShowModalEdit(false);
        getUsers(userDataRdx.credentials)
          .then((results) => {
            setUsers(results.data);
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => console.log(error));
  };

  const handleCloseModalEdit = () => {
    setSelectedUser(null);
    setShowModalEdit(false);
  };

  const roleHandler = (e, role) => {
    e.preventDefault();
    setSelectedRole(role);
    setEditedData((prevState) => ({
      ...prevState,
      role: role,
    }));
  };

  const inputHandlerFunction = (e) => {
    setEditedData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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
        <div className="profileContent">
          <div className="leftSideProfile">
            <div 
              className="modal show"
              style={{ display: "block", position: "initial", marginTop: userDataRdx.credentials.token.role === 'admin' ? '7em' : '0', }}
            >
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>{userProfileData.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body className="profileDataModal">
                  <div>
                    <a>Name: </a>
                    {userProfileData.name} {userProfileData.lastname}
                  </div>
                  <div>
                    <a>Email: </a> {userProfileData.email}
                  </div>
                  <div>
                    <a>Phone: </a> {userProfileData.phone_number}
                  </div>
                  <div>
                    <a>Address: </a> {userProfileData.address}
                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <FiEdit
                    className="appointmentsButton edit"
                    title="Edit profile"
                    onClick={() => handleOpenModalEdit(userProfileData)}
                  />
                </Modal.Footer>
              </Modal.Dialog>
            </div>
          </div>
          <div className="rightSideProfile">
         {userDataRdx.credentials.token.role != 'admin' && (   <Appointment />)}
          </div>
        </div>
      ) : (
        <div>CARGANDO</div>
      )}

      {userProfileData && (
        <AdminPanelModal
          selectedUser={selectedUser} 
          name={userProfileData.name}
          password={userProfileData.password}
          lastname={userProfileData.lastname}
          email={userProfileData.email}
          phone_number={userProfileData.phone_number}
          address={userProfileData.address}
          role={userProfileData.role}
          currentRole={userProfileData.role} 
          showModalEdit={showModalEdit}
          handleCloseModalEdit={handleCloseModalEdit}
          inputHandlerFunction={inputHandlerFunction}
          roleHandler={roleHandler} 
          editUserFunction={editUserFunction}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { FcSearch } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUsers, editUser, deleteUser } from "../../services/apiCalls.js";
import "./Admin.css";
import { capitalizeWords, truncate } from "../../services/functions.js";
import { Button, Modal, Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { AdminPanelModal } from "../../common/AdminPanelModal/AdminPanelModal.jsx";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const userDataRdx = useSelector(userData);
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState("");
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [editedData, setEditedData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    phone_number: "",
    role: "",
  });

  const inputHandlerFunction = (e) => {
    setEditedData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [selectedRole, setSelectedRole] = useState("");

  const inputHandler = (e) => {
    setCriteria(e.target.value);
  };

  const roleHandler = (e, role) => {
    e.preventDefault();
    setSelectedRole(role);
    setEditedData((prevState) => ({
      ...prevState,
      role: role,
    }));
  };

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

  const handleCloseModalEdit = () => {
    setSelectedUser(null);
    setShowModalEdit(false);
  };

  const handleOpenModalInfo = (user) => {
    setSelectedUser(user);
    setShowModalInfo(true);
  };

  const handleCloseModalInfo = () => {
    setSelectedUser(null);
    setShowModalInfo(false);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setSelectedUser(null);
    setShowConfirmationModal(false);
  };

  useEffect(() => {
    if (
      !userDataRdx.credentials.token ||
      userDataRdx.credentials.token.role !== "admin"
    ) {
      navigate("/");
    }
  }, []);


  const [showToast, setShowToast] = useState(false);

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

  const deleteUserFunction = () => {
    if (selectedUser) {
      deleteUser(userDataRdx.credentials, selectedUser._id)
        .then(() => {
          const updatedUsers = users.filter(
            (user) => user._id !== selectedUser._id
          );
          setUsers(updatedUsers);
          handleCloseConfirmationModal();
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (criteria !== "") {
      const bringUsers = setTimeout(() => {
        getUsers(userDataRdx.credentials, criteria)
          .then((res) => {
            setUsers(res.data);
          })
          .catch((error) => console.log(error));
      }, 375);

      return () => clearTimeout(bringUsers);
    } else {
      getUsers(userDataRdx.credentials)
        .then((results) => {
          setUsers(results.data);
        })
        .catch((err) => console.error(err));
    }
  }, [criteria]);

  return (
    <div className="adminDesign">
      <div className="adminInput">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <FcSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="search"
            name="criteria"
            onChange={(e) => inputHandler(e)}
          />
        </InputGroup>
      </div>
      {users && users.length > 0 ? (
        <div className="adminTable">
          <table className="table table-striped table-bordered table-hover usersTable">
            <thead className="fixed">
              <tr>
                <th style={{ width: "30%" }}>Name</th>
                <th style={{ width: "30%" }}>Email</th>
                <th style={{ width: "10%" }}>Phone</th>
                <th style={{ width: "25%" }}>Address</th>
                <th style={{ width: "5%" }}></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="selectedRow" key={user._id}>
                  <td
                    title={
                      capitalizeWords(user.name) +
                      " " +
                      capitalizeWords(user.lastname)
                    }
                  >
                    {truncate(
                      capitalizeWords(`${user.name} ${user.lastname}`),
                      30
                    )}
                  </td>
                  <td title={user.email}>
                    {truncate(capitalizeWords(user.email), 20)}
                  </td>
                  <td title={user.phone_number}>{user.phone_number}</td>
                  <td title={user.address}>
                    {truncate(capitalizeWords(user.address), 22)}
                  </td>
                  <td>
                    <div className="adminButtons">
                      <FaEye
                        className="appointmentsButton detail"
                        onClick={() => handleOpenModalInfo(user)}
                      />

                      <FiEdit
                        className="appointmentsButton edit"
                        title="Edit appointment"
                        onClick={() => handleOpenModalEdit(user)}
                      />
                      <AiFillDelete
                        className="appointmentsButton delete"
                        title="Delete appointment"
                        onClick={() => {
                          handleDeleteUser(user);
                          deleteUserFunction();
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}

      {selectedUser && (
        <AdminPanelModal
          selectedUser={selectedUser}
          name={selectedUser.name}
          password={selectedUser.password}
          lastname={selectedUser.lastname}
          email={selectedUser.email}
          phone_number={selectedUser.phone_number}
          address={selectedUser.address}
          role={selectedUser.role}
          currentRole={selectedRole}
          showModalEdit={showModalEdit}
          handleCloseModalEdit={handleCloseModalEdit}
          inputHandlerFunction={inputHandlerFunction}
          roleHandler={roleHandler}
          editUserFunction={editUserFunction}
          setShowToast={setShowToast}
          showToast={showToast}
        />
      )}

      <Modal show={showModalInfo} onHide={handleCloseModalInfo}>
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Card>
              <Card.Body>
                <Card.Title>
                  {capitalizeWords(selectedUser.name)}{" "}
                  {capitalizeWords(selectedUser.lastname)}
                </Card.Title>
                <Card.Text>
                  Email: {capitalizeWords(selectedUser.email)}
                </Card.Text>
                <Card.Text>Phone: {selectedUser.phone_number}</Card.Text>
                <Card.Text>
                  Address: {capitalizeWords(selectedUser.address)}
                </Card.Text>
                <Card.Text>
                  Role: {capitalizeWords(selectedUser.role)}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal>

      {selectedUser && (
        <Modal
          show={showConfirmationModal}
          onHide={handleCloseConfirmationModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this user?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmationModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteUserFunction}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

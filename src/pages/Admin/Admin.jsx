import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../userSlice.js";
import { detail } from "../detailSlice.js";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUsers, editUser, deleteUser } from "../../services/apiCalls.js";
import "./Admin.css";
import { capitalizeWords, truncate } from "../../services/functions.js";
import { Button, Modal, Form } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const userDataRdx = useSelector(userData);
  const navigate = useNavigate();

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

  useEffect(() => {
    getUsers(userDataRdx.credentials)
      .then((results) => {
        setUsers(results.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const editUserFunction = () => {
    editUser(userDataRdx.credentials, selectedUser, editedData)
      .then(() => {
        navigate("/admin");
      })
      .catch((error) => console.log(error));
  };

  const deleteUserFunction = () => {
    if (selectedUser) {
      deleteUser(userDataRdx.credentials, selectedUser._id)
        .then(() => {
          const updatedUsers = users.filter((user) => user._id !== selectedUser._id);
          setUsers(updatedUsers);
          handleCloseConfirmationModal();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="adminDesign">
      {users.length > 0 ? (
        <table className="table table-striped table-bordered table-hover usersTable">
          <thead className="fixed">
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "30%" }}>Name</th>
              <th style={{ width: "30%" }}>Email</th>
              <th style={{ width: "10%" }}>Phone Number</th>
              <th style={{ width: "25%" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="selectedRow" key={user._id}>
                <td>
                  <div
                    className="appointmentsButton detail"
                    onClick={() => handleOpenModalInfo(user)}
                  >
                    <FaEye />
                  </div>
                  <div
                    className="appointmentsButton edit"
                    title="Edit appointment"
                    onClick={() => handleOpenModalEdit(user)}
                  >
                    <FiEdit />
                  </div>
                  <div
                    className="appointmentsButton delete"
                    title="Delete appointment"
                    onClick={() => {
                      handleDeleteUser(user);
                      deleteUserFunction();

                    }}
                  >
                    <AiFillDelete />
                  </div>
                </td>
                <td
                  className="selectedCell"
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
                <td className="selectedCell" title={user.email}>
                  {truncate(capitalizeWords(user.email), 20)}
                </td>
                <td className="selectedCell" title={user.phone_number}>
                  {truncate(user.phone_number.toString(), 9)}
                </td>
                <td className="selectedCell" title={user.address}>
                  {truncate(capitalizeWords(user.address), 22)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
      <Modal show={showModalEdit} onHide={handleCloseModalEdit}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={selectedUser.name}
                  name={"name"}
                  onChange={(e) => inputHandlerFunction(e)}
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlLastname"
              >
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={selectedUser.lastname}
                  name={"lastname"}
                  onChange={(e) => inputHandlerFunction(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={selectedUser.email}
                  name={"email"}
                  onChange={(e) => inputHandlerFunction(e)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={selectedUser.password}
                  name={"password"}
                  onChange={(e) => inputHandlerFunction(e)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlPhoneNumber"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={selectedUser.phone_number}
                  name={"phone_number"}
                  onChange={(e) => inputHandlerFunction(e)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlAddress"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder={selectedUser.address}
                  name={"address"}
                  onChange={(e) => inputHandlerFunction(e)}
                />
              </Form.Group>

              <Dropdown className="mb-3">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {capitalizeWords(selectedRole)
                    ? truncate(capitalizeWords(selectedRole), 10)
                    : capitalizeWords(selectedUser.role)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={(e) => roleHandler(e, "client")}
                    name="client"
                  >
                    Client
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => roleHandler(e, "dentist")}
                    name="dentist"
                  >
                    Dentist
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => roleHandler(e, "admin")}
                    name="admin"
                  >
                    Admin
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={() => editUserFunction()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

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
        <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
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

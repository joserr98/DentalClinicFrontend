import React from "react";
import "./AdminPanelModal.css";
import { Button, Modal, Form } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { capitalizeWords, truncate } from "../../services/functions";
import Toast from "react-bootstrap/Toast";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";

export const AdminPanelModal = ({
  selectedUser,
  name,
  lastname,
  email,
  password,
  phone_number,
  address,
  role,
  currentRole,
  showModalEdit,
  handleCloseModalEdit,
  inputHandlerFunction,
  roleHandler,
  editUserFunction,
  showToast,
  setShowToast,
}) => {
  const userDataRdx = useSelector(userData);
  return (
    <Modal show={showModalEdit} onHide={handleCloseModalEdit}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedUser && (
          <Form>
            <Form.Group controlId="exampleForm.ControlName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={name}
                name={"name"}
                onChange={(e) => inputHandlerFunction(e)}
                autoFocus
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlLastname">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                placeholder={lastname}
                name={"lastname"}
                onChange={(e) => inputHandlerFunction(e)}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder={email}
                name={"email"}
                onChange={(e) => inputHandlerFunction(e)}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder={password}
                name={"password"}
                onChange={(e) => inputHandlerFunction(e)}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder={phone_number}
                name={"phone_number"}
                onChange={(e) => inputHandlerFunction(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder={address}
                name={"address"}
                onChange={(e) => inputHandlerFunction(e)}
              />
            </Form.Group>
            {userDataRdx.credentials.token.role == 'admin'  && (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {capitalizeWords(currentRole)
                  ? truncate(capitalizeWords(currentRole), 10)
                  : capitalizeWords(role)}
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
            )}
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

      <div className="toast-container">
        <Toast
          bg={"danger"}
          show={showToast}
          delay={1350}
          autohide
          className="toasted"
          style={{
            position: "fixed",
            zIndex: 999,
            top: 0,
          }}
          onClose={() => setShowToast(false)}
        >
          <Toast.Body>Please, make sure you enter your password.</Toast.Body>
        </Toast>
      </div>
    </Modal>
  );
};

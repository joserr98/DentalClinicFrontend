import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../userSlice.js";
import { detail } from "../detailSlice.js";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import {
  deleteAppointment,
  getUserAppointments,
} from "../../services/apiCalls";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Appointment.css";
import {
  capitalizeWords,
  formatedDate,
  truncate,
} from "../../services/functions.js";
import { Button, Modal } from "react-bootstrap";

export const Appointment = () => {
  const [userAppointments, setUserAppointments] = useState([]);
  const [criteria, setCriteria] = useState("");

  const userDataRdx = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (!userDataRdx.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getUserAppointments(userDataRdx.credentials)
      .then((results) => {
        setUserAppointments(results.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const getAppointmentDetail = (appointment) => {
    dispatch(detail({ data: appointment }));
    navigate(`/appointment_detail`);
  };

  const editAppointmentDetail = (appointment) => {
    dispatch(detail({ data: appointment }));
    navigate(`/appointment_edit`);
  };

  const createNewAppointment = () => {
    navigate(`/appointment_new`);
  };

  const handleDeleteAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setSelectedAppointment(null);
    setShowConfirmationModal(false);
  };

  const deleteAppointmentFunction = (_id) => {
    deleteAppointment(_id, userDataRdx.credentials)
      .then(() => {
        const updatedAppointments = userAppointments.filter(
          (appointment) => appointment._id !== _id
        );
        setUserAppointments(updatedAppointments);
        handleCloseConfirmationModal();
      })
      .catch((error) => console.error(error));
  };

  const inputHandler = (e) => {
    setCriteria(e.target.value);
  };

  return (
    <div className="appointmentDesign">
      <div className="appointmentsButton add" onClick={createNewAppointment}>
        <IoIosAddCircleOutline />
      </div>
      {userAppointments.length > 0 ? (
        userAppointments.map((appointment) => {
          return (
            <div className="appointmentCards" key={appointment._id}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {formatedDate(appointment.start_date)}
                  </Card.Title>
                  <Card.Text>
                    {truncate(capitalizeWords(appointment.type.name), 8)}
                  </Card.Text>
                  <Card.Text>
                    {truncate(capitalizeWords(appointment.client.name), 8)}
                  </Card.Text>
                  <div className="appointmentsButtonDiv">
                    <div
                      className="appointmentsButton detail"
                      onClick={() => getAppointmentDetail(appointment)}
                    >
                      <FaEye />
                    </div>
                    <div
                      className="appointmentsButton edit"
                      title="Edit appointment"
                      onClick={() => editAppointmentDetail(appointment)}
                    >
                      <FiEdit />
                    </div>
                    <div
                      className="appointmentsButton delete"
                      title="Delete appointment"
                      onClick={() => handleDeleteAppointment(appointment)}
                    >
                      <AiFillDelete />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })
      ) : (
        <></>
      )}

      <Modal
        show={showConfirmationModal}
        onHide={handleCloseConfirmationModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this appointment?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteAppointmentFunction(selectedAppointment._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

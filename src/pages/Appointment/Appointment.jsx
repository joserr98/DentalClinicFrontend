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
import { deleteAppointment, getUserAppointments } from "../../services/apiCalls";
import "./Appointment.css";

export const Appointment = () => {
  const [userAppointments, setUserAppointments] = useState([]);

  const userDataRdx = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    navigate(`/appointment_detail`)
  }

  const deleteAppointmentFunction = (_id) => {
    deleteAppointment(_id, userDataRdx.credentials)
      .then(() => {
        const updatedAppointments = userAppointments.filter(
          (appointment) => appointment._id !== _id
        );
        setUserAppointments(updatedAppointments);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="appointmentDesign">
      {userAppointments.length > 0 ? (
        userAppointments.map((appointment) => {
          return (
            <div key={appointment._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{appointment.start_date}</Card.Title>
                  <Card.Text>
                    {appointment.type.treatment.charAt(0).toUpperCase() +
                      appointment.type.treatment.slice(1)}{" "}
                  </Card.Text>
                  <Card.Text>
                    Professional:{" "}
                    {appointment.dentist.name.charAt(0).toUpperCase() +
                      appointment.dentist.name.slice(1)}
                  </Card.Text>
                  <div className="appointmentsButtonDiv">
                    <div
                      className="appointmentsButton edit"
                      title="Edit appointment"
                    >
                      <FiEdit />
                    </div>
                    <div
                      className="appointmentsButton delete"
                      title="Delete appointment"
                      onClick={() => deleteAppointmentFunction(appointment._id)}
                    >
                      <AiFillDelete />
                    </div>
                  </div>
                  <div>
                    <IoIosAddCircleOutline className="add" />
                  </div>
                  <div
                    className="detail"
                    onClick={() => getAppointmentDetail(appointment)}
                  >
                    <FaEye />
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })
      ) : (
        <div>CARGANDO...</div>
      )}
    </div>
  );
};

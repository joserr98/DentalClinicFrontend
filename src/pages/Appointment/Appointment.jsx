import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { getUserAppointments } from "../../services/apiCalls.js";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { deleteAppointment } from "../../services/apiCalls";

export const Appointment = () => {
  const [userAppointments, setUserAppointments] = useState([]);

  const userDataRdx = useSelector(userData);

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
    <div>
      {userAppointments.length > 0 ? (
        userAppointments.map((appointment) => {
          return (
            <div key={appointment._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{appointment.start_date}</Card.Title>
                  <Card.Text>Type of intervention: </Card.Text>
                  <Card.Text>
                    Professional: {appointment.dentist.name}
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
                  <div className="detail">
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

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
import { capitalizeWords, formatedDate } from "../../services/functions.js";

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
    navigate(`/appointment_detail`);
  };

  const editAppointmentDetail = (appointment) => {
    dispatch(detail({ data: appointment }));
    navigate(`/appointment_edit`);
  };

  const createNewAppointment = () => {
    navigate(`/appointment_new`);
  };

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
                  <Card.Title>
                    {formatedDate(appointment.start_date)}
                  </Card.Title>
                  <Card.Text>
                    {capitalizeWords(appointment.type.name)}
                  </Card.Text>
                  <Card.Text>
                    Dentist: {}
                    {capitalizeWords(appointment.dentist.name)}
                  </Card.Text>
                  <div className="appointmentsButtonDiv">
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
                      onClick={() => deleteAppointmentFunction(appointment._id)}
                    >
                      <AiFillDelete />
                    </div>
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
        <></>
      )}
      <div className="add" onClick={() => createNewAppointment()}>
        <IoIosAddCircleOutline />
      </div>
    </div>
  );
};

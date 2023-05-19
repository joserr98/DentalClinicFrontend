import React from "react";
import "./AppointmentCard.css";
import { Card } from "react-bootstrap";
import {
  capitalizeWords,
  formatedDate,
  truncate,
} from "../../services/functions.js";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

export const AppointmentCard = ({
  start_date,
  dentist_name,
  client_name,
  type,
  appointment,
  getAppointment,
  editAppointment,
  deleteAppointment,
}) => {
  return (
      <Card className="appointmentCards">
        <Card.Body>
          <Card.Title>{formatedDate(start_date)}</Card.Title>
          <Card.Text>Type: {truncate(capitalizeWords(type), 8)}</Card.Text>
          <Card.Text>Patient: {truncate(capitalizeWords(client_name), 8)}</Card.Text>
          <Card.Text>Dentist: {truncate(capitalizeWords(dentist_name), 8)}</Card.Text>
          <div className="appointmentsButtonDiv">
            <div
              className="appointmentsButton detail"
              onClick={() => getAppointment(appointment)}
            >
              <FaEye />
            </div>
            <div
              className="appointmentsButton edit"
              title="Edit appointment"
              onClick={() => editAppointment(appointment)}
            >
              <FiEdit />
            </div>
            <div
              className="appointmentsButton delete"
              title="Delete appointment"
              onClick={() => deleteAppointment(appointment)}
            >
              <AiFillDelete />
            </div>
          </div>
        </Card.Body>
      </Card>
  );
};

import React, { useState } from "react";
import "./AppointmentEdit.css";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import { detail, detailData } from "../detailSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { editAppointment } from "../../services/apiCalls";
export const AppointmentEdit = () => {
  const dispatch = useDispatch();
  const userDataRdx = useSelector(userData);
  const detailDataRdx = useSelector(detailData);
  const [editedAppointment, setEditedAppointment] = useState({});

  const inputHandlerFunction = (e) => {
    setEditedAppointment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const editAppointmentButton = () => {
    if (detailDataRdx && detailDataRdx.data) {
        editAppointment(
        userDataRdx.credentials,
        detailDataRdx.data,
        editedAppointment
      )
        .then((results) => {
        dispatch(detail({ data: { ...detailDataRdx.data, start_date: results.config.data } }));
        })
        .catch((error) => console.error(error));
    } else {
      console.error("Data is null");
    }
  };

  return (
    <div className="appointmentEditDesign">
      <Form className="form">
        <Form.Group className="mb-3" controlId="formBasicStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="datetime-local"
            className={"basicInput"}
            name={"start_date"}
            onChange={(e) => inputHandlerFunction(e)}
          />
        </Form.Group>
        <Button variant="primary" onClick={() => editAppointmentButton()}>
          Edit
        </Button>
      </Form>
    </div>
  );
};

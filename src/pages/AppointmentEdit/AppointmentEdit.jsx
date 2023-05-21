import React, { useState, useEffect } from "react";
import "./AppointmentEdit.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import { detailData } from "../detailSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  editAppointment,
  getDetailedAppointment,
} from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { capitalizeWords } from "../../services/functions";

export const AppointmentEdit = () => {
  const navigate = useNavigate();
  const userDataRdx = useSelector(userData);
  const detailDataRdx = useSelector(detailData);
  const [editedAppointment, setEditedAppointment] = useState({
    start_date: "",
    end_date: "",
  });
  const [detailedAppointment, setDetailedAppointment] = useState([]);

  const inputHandlerFunction = (e) => {
    setEditedAppointment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    getDetailedAppointment(userDataRdx.credentials, detailDataRdx.data)
      .then((results) => {
        setDetailedAppointment(results.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const editAppointmentButton = () => {
    if (detailDataRdx && detailDataRdx.data) {
      editAppointment(
        userDataRdx.credentials,
        detailDataRdx.data,
        editedAppointment
      )
        .then(() => {
          if(userDataRdx.credentials.token.role != 'admin'){
            navigate("/profile");
          } else {
            navigate("/appointments");
          }
        })
        .catch((error) => console.error(error));
    } else {
      console.error("Data is null");
    }
  };

  useEffect(() => {
    if (!userDataRdx.credentials.token) {
      navigate("/");
    }
  }, []);
  
  return Object.keys(detailedAppointment).length === 0 ? (
    <div>Loading...</div>
  ) : (
    <div className="appointmentEditDesign">
      <Card>
        <Card.Body>
          <Card.Title>
            {capitalizeWords(detailedAppointment.type.name)}
          </Card.Title>
          <Card.Text>
              Dentist: {detailedAppointment.dentist.name}{" "}
              {detailedAppointment.dentist.lastname}
          </Card.Text>
          <Card.Text>
              Client: {detailedAppointment.client.name}{" "}
              {detailedAppointment.client.lastname}
          </Card.Text>
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

              <Form.Group className="mb-3" controlId="formBasicEndDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  className={"basicInput"}
                  name={"end_date"}
                  onChange={(e) => inputHandlerFunction(e)}
                />
              </Form.Group>
              <Button variant="primary" onClick={() => editAppointmentButton()}>
                Edit
              </Button>
              <Button variant="secondary" onClick={() => {
              if (userDataRdx.credentials.token.role !== "admin") {
                navigate("/profile");
              } else {
                navigate("/appointments");
              }
            }}>
          Close
        </Button>
            </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

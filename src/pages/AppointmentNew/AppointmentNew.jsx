import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AppointmentNew.css";
import Dropdown from "react-bootstrap/Dropdown";
import {
  listTreatment,
  getDentists,
  getClients,
  createAppointment,
} from "../../services/apiCalls";
import { capitalizeWords, truncate } from "../../services/functions";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const AppointmentNew = () => {
  // USEFUL CONSTS
  const navigate = useNavigate();
  const userDataRdx = useSelector(userData);

  // DATA FROM DB
  const [treatments, setTreatments] = useState([]);
  const [dentists, setDentists] = useState([]);
  const [clients, setClients] = useState([]);

  // FORM DATA
  const [newAppointment, setNewAppointment] = useState({
    start_date: "",
    end_date: "",
    dentist: "",
    client: "",
    type: "",
  });

  // SELECTS
  const [selectedTreatmentItem, setSelectedTreatmentItem] = useState(null);
  const [selectedDentistItem, setSelectedDentistItem] = useState(null);
  const [selectedClientItem, setSelectedClientItem] = useState(null);

  // USE EFFECTS
  useEffect(() => {
    if (treatments.length === 0) {
      listTreatment()
        .then((results) => {
          setTreatments(results.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (dentists.length === 0) {
      getDentists()
        .then((results) => {
          setDentists(results.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (clients.length === 0) {
      getClients()
        .then((results) => {
          setClients(results.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const createAppointmentButton = () => {
    createAppointment(userDataRdx.credentials, newAppointment)
      .then(() => {
        navigate("/appointments");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log(newAppointment);
  });

  const newAppointmentHandler = (e, value) => {
    setNewAppointment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : value,
    }));
  };

  const setTreatment = (selected) => {
    setSelectedTreatmentItem(selected);
  };

  const setDentist = (selected) => {
    setSelectedDentistItem(selected);
  };

  const setClient = (selected) => {
    setSelectedClientItem(selected);
  };

  return (
    <div className="newAppointmentDesign">
      <div className="newAppointmentForm">
        <div className="treatmentDropdown">
          {treatments.length > 0 && (
            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedTreatmentItem
                  ? truncate(capitalizeWords(selectedTreatmentItem), 10)
                  : "Treatment"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {treatments.map((treatment) => (
                  <Dropdown.Item
                    key={treatment._id}
                    onClick={(e) => {
                      newAppointmentHandler(e, treatment._id);
                      setTreatment(treatment.name);
                    }}
                    name={"type"}
                  >
                    {capitalizeWords(treatment.name)}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <div className="specialistDropdown">
          {dentists.length > 0 &&
            userDataRdx.credentials &&
            userDataRdx.credentials.token.role !== "dentist" && (
              <Dropdown className="mb-3">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedDentistItem
                    ? truncate(capitalizeWords(selectedDentistItem), 10)
                    : "Dentist"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {dentists.map((dentist) => (
                    <Dropdown.Item
                      key={dentist._id}
                      onClick={(e) => {
                        newAppointmentHandler(e, dentist._id);
                        setDentist(dentist.name);
                      }}
                      name={"dentist"}
                    >
                      {capitalizeWords(dentist.name)}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}

          {clients.length > 0 &&
            userDataRdx.credentials.token.role !== "client" && (
              <Dropdown className="mb-3">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedClientItem
                    ? truncate(capitalizeWords(selectedClientItem), 10)
                    : "Client"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {clients.map((client) => (
                    <Dropdown.Item
                      key={client._id}
                      onClick={(e) => {
                        newAppointmentHandler(e, client._id);
                        setClient(client.name);
                      }}
                      name={"client"}
                    >
                      {capitalizeWords(client.name)}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
        </div>
        <Form className="form">
          <Form.Group className="mb-3" controlId="formBasicStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="datetime-local"
              className={"basicInput"}
              name={"start_date"}
              onChange={(e) => newAppointmentHandler(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="datetime-local"
              className={"basicInput"}
              name={"end_date"}
              onChange={(e) => newAppointmentHandler(e)}
            />
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={() => createAppointmentButton()}>
          New Appointment
        </Button>
      </div>
    </div>
  );
};

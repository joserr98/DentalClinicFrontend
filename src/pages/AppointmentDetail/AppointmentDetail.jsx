import React, { useState, useEffect } from "react";
import "./AppointmentDetail.css";
import { getDetailedAppointment } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import { detailData } from "../detailSlice";
import { capitalizeWords, formatedDate } from "../../services/functions";
import { Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
export const AppointmentDetail = () => {
  const userDataRdx = useSelector(userData);
  const detailDataRdx = useSelector(detailData);
  const [detailedAppointment, setDetailedAppointment] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDetailedAppointment(userDataRdx.credentials, detailDataRdx.data)
      .then((results) => {
        setDetailedAppointment(results.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!userDataRdx.credentials.token) {
      navigate("/");
    }
  }, []);

  return Object.keys(detailedAppointment).length === 0 ? (
    <div>Loading...</div>
  ) : (
    <div className="detailDesign">
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header
            closeButton
            onClick={() => {
              if (userDataRdx.credentials.token.role !== "admin") {
                navigate("/profile");
              } else {
                navigate("/appointments");
              }
            }}
          >
            <Modal.Title>
              {formatedDate(detailedAppointment.start_date)}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Card>
              <Card.Body>
                <Card.Title>
                  {capitalizeWords(detailedAppointment.type.name)}
                </Card.Title>
                <Card.Text>
                  Dentist: {capitalizeWords(detailedAppointment.dentist.name)}{" "}
                  {capitalizeWords(detailedAppointment.dentist.lastname)}
                </Card.Text>
                <Card.Text>
                  Client: {capitalizeWords(detailedAppointment.client.name)}{" "}
                  {capitalizeWords(detailedAppointment.client.lastname)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Modal.Body>

          <Modal.Footer></Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};

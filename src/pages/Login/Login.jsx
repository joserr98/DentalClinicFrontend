import React, { useEffect, useState } from "react";
import "./Login.css";

import { loginMe } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const Login = () => {
  const dispatch = useDispatch();
  const userDataRdx = useSelector(userData);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const inputHandlerFunction = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (userDataRdx.credentials.token) {
      navigate("/");
    }
  }, []);

  const userLogin = () => {
    loginMe(credentials)
      .then((res) => {
        const decoded = jwt_decode(res.data.token);

        const data = {
          token: res.data.token,
          user: decoded,
        };

        dispatch(login({ credentials: data }));
        setMessage(`Welcome again ${decoded.name}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="loginDesign">
      <div className="loginForm">
        <Form className="form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type={"email"}
              name={"email"}
              placeholder={"Enter email"}
              onChange={() => inputHandlerFunction()}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={"password"}
              name={"password"}
              placeholder={"Enter password"}
              onChange={() => inputHandlerFunction()}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          <Button variant="primary" onClick={() => userLogin()}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

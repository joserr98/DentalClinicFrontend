import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import { loginMe } from "../../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
export const Login = () => {
  const dispatch = useDispatch();
  const userDataRdx = useSelector(userData);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const inputHandlerFunction = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const logMeFunction = () => {
    loginMe(credentials)
      .then((result) => {
        const decoded = jwt_decode(result.data.token);

        const data = {
          bearer: result.data.token,
          token: decoded,
        };

        dispatch(login({ credentials: data }));

        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  useEffect(()=>{
    if(userDataRdx.credentials.token){
      navigate("/")
    };
  },[]);

  return (
    <div className="loginDesign">
      <div className="loginForm">
        <Form className="form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              className={"basicInput"}
              placeholder="Enter email"
              name={"email"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className={"basicInput"}
              placeholder="Enter password"
              name={"password"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          <Button variant="primary" onClick={() => logMeFunction()}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

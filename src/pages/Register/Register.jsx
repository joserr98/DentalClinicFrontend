import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Register.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Register = () => {
  return (
    <div className="registerDesign">
      <div className="registerForm">
        <Form className="form">
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name address</Form.Label>
            <Form.Control type="name" placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <Form.Text className="text-muted">
              Make sure you set a valid password.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="phone_number" placeholder="Enter phone number" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

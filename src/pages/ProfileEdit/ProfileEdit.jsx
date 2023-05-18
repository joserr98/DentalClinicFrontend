import React from 'react'
import { Form } from 'react-bootstrap'
import Button from "react-bootstrap/Button";

export const ProfileEdit = () => {
  return (
    <div className='profileEditDesign'>
                <Form className="form">
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              className={"basicInput"}
              placeholder="Enter name"
              name={"name"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicLastname">
            <Form.Label>Lastame</Form.Label>
            <Form.Control
              type="text"
              className={"basicInput"}
              placeholder="Enter lastname"
              name={"lastname"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              className={"basicInput"}
              placeholder="Enter email"
              name={"email"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className={"basicInput"}
              placeholder="Password"
              name={"password"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              className={"basicInput"}
              placeholder="address"
              name={"address"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              className={"basicInput"}
              placeholder="phone_number"
              name={"phone_number"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Button variant="primary" onClick={() => registerMeFunction()}>
            Register
          </Button>
        </Form>
    </div>
  )
}

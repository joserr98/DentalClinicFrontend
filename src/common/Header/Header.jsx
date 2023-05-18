import React, { useEffect } from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { erase } from "../../pages/detailSlice";
export const Header = () => {
  const userDataRdx = useSelector(userData);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logMeOut = () => {
    dispatch(logout({ credentials: {} }));
    dispatch(erase({ credentials: {}, date: {} }));
    navigate("/");
  };

  return (
    <div className="headerDesign">
      {!userDataRdx?.credentials?.token ? (
        <Navbar variant="dark" className="headerDesign">
          <Container>
            <Navbar.Brand onClick={() => navigate("/")}>Home</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
              <Nav.Link onClick={() => navigate("/register")}>
                Register
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      ) : (
        <>
          <Navbar variant="dark" className="headerDesign">
            <Container>
              <Navbar.Brand onClick={() => navigate("/")}>Home</Navbar.Brand>
              <Nav className="me-auto">
                {userDataRdx.credentials.token.role == "admin" && (
                  <Nav.Link onClick={() => navigate("/admin")}>Admin</Nav.Link>
                )}

                {userDataRdx.credentials.token.role == "admin" && (
                  <Nav.Link onClick={() => navigate("/appointments")}>
                    Appointments
                  </Nav.Link>
                )}
                <Nav.Link onClick={() => navigate("/profile")}>
                  {userDataRdx.credentials.token.name}
                </Nav.Link>

                <Nav.Link onClick={() => logMeOut()}>LogOut</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      )}
    </div>
  );
};

import React, { useState } from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { erase } from "../../pages/detailSlice";
export const Header = () => {
  const userDataRdx = useSelector(userData);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const logMeOut = () => {
    dispatch(logout({ credentials: {} }));
    dispatch(erase({ credentials: {}, date: {} }));
    navigate("/");
  };
  const handleToggleClick = () => {
    setIsToggleOpen(!isToggleOpen);
  };
  return (
    <div className="headerDesign">
      {!userDataRdx?.credentials?.token ? (
        <Navbar variant="dark" expand="lg" className="headerDesign">
          <Container>
            <Navbar.Brand onClick={() => navigate("/")}>Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav">
              <FaBars />
            </Navbar.Toggle>
            <Navbar.Collapse id="navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
                <Nav.Link onClick={() => navigate("/register")}>
                  Register
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <>
          <Navbar variant="dark" expand="md" className="headerDesign">
            <Container>
              <Navbar.Brand onClick={() => navigate("/")}>Home</Navbar.Brand>
              <Navbar.Toggle
                aria-controls="navbar-nav"
                onClick={handleToggleClick}
              >
                <FaBars />
              </Navbar.Toggle>
              <Navbar.Collapse
                id="navbar-nav"
                className={isToggleOpen ? "show" : ""}
              >
                <Nav className="me-auto">
                  {userDataRdx.credentials.token.role === "admin" && (
                    <Nav.Link onClick={() => navigate("/admin")}>
                      Admin
                    </Nav.Link>
                  )}
                  {userDataRdx.credentials.token.role === "admin" && (
                    <Nav.Link onClick={() => navigate("/appointments")}>
                      Appointments
                    </Nav.Link>
                  )}
                  {userDataRdx.credentials.token.role !== "admin" && (
                    <Nav.Link onClick={() => navigate("/profile")}>
                      {userDataRdx.credentials.token.name}
                    </Nav.Link>
                  )}
                  <Nav.Link onClick={() => logMeOut()}>LogOut</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )}
    </div>
  );
};

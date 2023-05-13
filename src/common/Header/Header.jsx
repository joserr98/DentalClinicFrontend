import React, {useEffect} from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
export const Header = () => {
  
  const datosUserRedux = useSelector(userData);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logMeOut = () => {
    dispatch(logout({ credentials: {}}));
    navigate("/");
  }

  return (
    <div className="headerDesign">
      {!datosUserRedux?.credentials?.token ? (
        <Navbar className="headerDesign" bg="dark" variant="dark">
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
          <Navbar className="headerDesign" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand onClick={() => navigate("/")}>Home</Navbar.Brand>
              <Nav className="me-auto">
                {datosUserRedux?.credentials?.role === "admin" && (
                  <Nav.Link onClick={() => navigate("/admin")}>Admin</Nav.Link>
                )}
                <Nav.Link onClick={() => navigate("/profile")}>Profile</Nav.Link>
                <Nav.Link onClick={() => navigate("/appointments")}>Appointments</Nav.Link>
                <Nav.Link onClick={()=> logMeOut()}>LogOut</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      )}
    </div>
  );
};

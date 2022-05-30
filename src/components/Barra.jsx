import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Barra() {
  const [show, setShow] = useState(true);
  const [opcionRegistro, setOpcionRegistro] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setMenu(true);
      setShow(false);
      setOpcionRegistro(true);
    }
  }, []);

  const salir = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand={show}>
        <Container fluid>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Brand hidden={show} href="#">
            <i class="fa-solid fa-user"></i> Bienvenido:{" "}
            {sessionStorage.getItem("nombre")}
          </Navbar.Brand>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Link
            hidden={opcionRegistro}
            style={{ color: "#FFF", textDecoration: "none" }}
            to="/registrarSucursal"
          >
            {" "}
            <i className="fas fa-user-plus"></i>
            <Navbar.Brand>Registrarse</Navbar.Brand>
          </Link>
          <Navbar.Brand hidden={show} href="#" onClick={() => salir()} to="/">
            <i class="fa-solid fa-person-running"></i> Cerrar sesión
          </Navbar.Brand>

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbar"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Opciones
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown title="Registros" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="/registrarVendedor">
                    <i class="fa-solid fa-people-carry-box"></i> Registrar
                    Vendedor
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown title="Reportes" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="/verVendedores">
                    Ver Vendedores
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

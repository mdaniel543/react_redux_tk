import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function OffcanvasExample() {
  const [expand, setExpand] = React.useState(false);

  const filterMarcas = () => {
    console.log("filterMarca");
  };

  const filterModelos = () => {
    console.log("filterModelo");
  };

  const filterColors = () => {
    console.log("filterColor");
  };

  return (
    <>
      <Navbar
        key={expand}
        bg="black"
        variant="dark"
        expand={expand}
        className="mb-3"
      >
        <Container fluid>
          <Navbar.Brand href="#">Vehiculos</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Filtrar
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Placa"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown
                  title="Marca"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item onClick={filterMarcas}>
                    Action
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <></>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown
                  title="Modelo"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item onClick={filterModelos}>
                    Action
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown
                  title="Color"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item onClick={filterColors}>
                    Action
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasExample;

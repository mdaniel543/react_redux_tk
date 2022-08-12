import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CloseButton from "react-bootstrap/CloseButton";

import { useSelector, useDispatch } from "react-redux";

import { filterColors, filterMarca, filterModelo, quitFilter } from "../features/vehicles/vehicleSlice";

function OffcanvasExample() {
  const [expand, setExpand] = React.useState(false);

  const { color: colors } = useSelector((state) => state.vehicles);
  const { marca: marcas } = useSelector((state) => state.vehicles);
  const { modelo: modelos } = useSelector((state) => state.vehicles);
  const { list: vehicles } = useSelector((state) => state.vehicles);
  const { copy: copies } = useSelector((state) => state.vehicles);

  const [color, setColor] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setColor("")
    setMarca("")
    setModelo("")
  }, [marcas, modelos, colors]);

  const filterMarcas = (marca) => {
    dispatch(filterMarca(vehicles, marca));
    setMarca(marca);
  };

  const filterModelos = (modelo) => {
    dispatch(filterModelo(vehicles, modelo));
    setModelo(modelo);
  };

  const filterColor = (color) => {
    dispatch(filterColors (vehicles, color));
    setColor(color);
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
              <Nav
                style={{ marginTop: "20px" }}
                className="justify-content-end flex-grow-1 pe-3"
              >
                <NavDropdown
                  title="Marca"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  {marcas.map((marca) => (
                    <NavDropdown.Item onClick={() => filterMarcas(marca)}>
                      {marca}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
              <Nav
                style={{ marginTop: "20px" }}
                className="justify-content-end flex-grow-1 pe-3"
              >
                <NavDropdown
                  title="Modelo"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  {modelos.map((modelo) => (
                    <NavDropdown.Item onClick={() => filterModelos(modelo)}>
                      {modelo}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
              <Nav
                style={{ marginTop: "20px" }}
                className="justify-content-end flex-grow-1 pe-3"
              >
                <NavDropdown
                  title="Color"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  {colors.map((color) => (
                    <NavDropdown.Item onClick={() => filterColor(color)}>
                      {color}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <GridExample 
        marca={marca} 
        hideMarca={()=> setMarca("")} 
        modelo={modelo} 
        hideModelo={()=> setModelo("")}
        color={color}
        hideColor={()=> setColor("")}
        dispatch={dispatch}
        copy={copies}
       />
    </>
  );
}

function GridExample(props) {
  const quitColor = () => {
    props.dispatch(quitFilter(props.copy, 'marca', 'modelo', props.marca, props.modelo));
    props.hideColor();
  }
  const quitMarca = () => {
    props.dispatch(quitFilter(props.copy, 'color','modelo', props.color, props.modelo));
    props.hideMarca();
  }
  const quitModelo = () => {
    props.dispatch(quitFilter(props.copy, 'marca', 'color', props.marca, props.color));
    props.hideModelo();
  }

  return (
    <Row
      style={{ marginLeft: "1150px", marginRight: "20px" }}
      xs={1}
      md={3}
      className="g-4"
    >
      {props.marca ? (
        <Col>
          <Card border="dark" style={{ width: "7.5rem" }}>
            <Card.Header>
              {props.marca} <CloseButton onClick={quitMarca}/>{" "}
            </Card.Header>
          </Card>
        </Col>
      ) : (
        <></>
      )}
      {props.color ? (
        <Col>
          <Card border="dark" style={{ width: "7.5rem" }}>
            <Card.Header>
              {props.color} <CloseButton onClick={quitColor}/>{" "}
            </Card.Header>
          </Card>
        </Col>
      ) : (
        <></>
      )}
      {props.modelo ? (
        <Col>
          <Card border="dark" style={{ width: "6.2rem" }}>
            <Card.Header>
              {props.modelo} <CloseButton onClick={quitModelo} />{" "}
            </Card.Header>
          </Card>
        </Col>
      ) : (
        <></>
      )}
    </Row>
  );
}

export default OffcanvasExample;

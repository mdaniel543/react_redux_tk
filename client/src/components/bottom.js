import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function CreateVehicle({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ marginLeft: "40px", marginTop: "35px" }}>
      <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Ingresar Datos del Vehiculo</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Row>
              <Col>
                <Form.Control type="text" placeholder="Placa" />
              </Col>
              <Col>
                <Form.Control type="text" placeholder="Marca" />
              </Col>
              <Col>
                <Form.Control type="text" placeholder="Modelo" />
              </Col>
              <Col>
                <Form.Control type="text" placeholder="Color" />
              </Col>
            </Row>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 2, offset: 11 }}>
                <Button style={{marginTop: '20px'}} variant="dark" type="submit">Registrar</Button>
              </Col>
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default CreateVehicle;

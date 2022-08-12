import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { addVehicle } from "../features/vehicles/vehicleSlice";

function CreateVehicle({ name, ...props }) {
  const [vehicle, setVehicle] = useState({});
  const [confirm, setConfirm] = useState(false);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (confirm) {
      console.log(vehicle);
      dispatch(addVehicle(vehicle));
      setConfirm(false);
      setVehicle({});
      setShow(false);
    }
  }, [confirm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setVehicle({ ...vehicle, Modelo: parseInt(vehicle.Modelo) });
    setConfirm(true);
  };

  return (
    <div style={{ marginLeft: "70px", marginTop: "20px" }}>
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
                <Form.Control
                  onChange={handleChange}
                  name="Placa"
                  type="text"
                  placeholder="Placa"
                />
              </Col>
              <Col>
                <Form.Control
                  onChange={handleChange}
                  name="Marca"
                  type="text"
                  placeholder="Marca"
                />
              </Col>
              <Col>
                <Form.Control
                  onChange={handleChange}
                  name="Serie"
                  type="text"
                  placeholder="Serie"
                />
              </Col>
              <Col>
                <Form.Control
                  onChange={handleChange}
                  name="Modelo"
                  type="number"
                  placeholder="Modelo"
                />
              </Col>
              <Col>
                <Form.Control
                  onChange={handleChange}
                  name="Color"
                  type="text"
                  placeholder="Color"
                />
              </Col>
            </Row>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 2, offset: 11 }}>
                <Button
                  onClick={handleSubmit}
                  style={{ marginTop: "20px" }}
                  variant="dark"
                  type="submit"
                >
                  Registrar
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default CreateVehicle;

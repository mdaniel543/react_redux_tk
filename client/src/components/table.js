import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2/dist/sweetalert2.js";

import {
  fetchVehicles,
  deleteVehicle,
  updateVehicle,
} from "../features/vehicles/vehicleSlice";

function DarkExample() {
  const { list: vehicles } = useSelector((state) => state.vehicles);
  const [modalShow, setModalShow] = useState(false);
  const [select, setSelect] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estas seguro de elimanar el vehiculo?",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteVehicle(id));
      }
    });
  };

  const handleModal = (vehicle) => {
    setSelect(vehicle);
    setModalShow(true);
  };

  return (
    <>
      <Container style={{ marginTop: "50px" }}>
        <Table striped bordered hover variant="dark" size="xl">
          <thead>
            <tr>
              <th>#</th>
              <th>Placa</th>
              <th>Marca</th>
              <th>Serie</th>
              <th>Modelo</th>
              <th>Color</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{vehicle.Placa}</td>
                <td>{vehicle.Marca}</td>
                <td>{vehicle.Serie}</td>
                <td>{vehicle.Modelo}</td>
                <td>{vehicle.Color}</td>
                <td>
                  <center>
                    <Button
                      onClick={() => handleModal(vehicle)}
                      variant="outline-info"
                    >
                      Editar
                    </Button>
                  </center>
                </td>
                <td>
                  <center>
                    <Button
                      onClick={() => handleDelete(vehicle._id)}
                      variant="outline-danger"
                    >
                      Eliminar
                    </Button>
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <ModalEdit
        show={modalShow}
        onHide={() => setModalShow(false)}
        vehicle={select}
        dispatch={dispatch}
      />
    </>
  );
}

function ModalEdit(props) {
  const [vehicle, setVehicle] = useState({});

  const handleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]:
        e.target.name === "Modelo" ? parseInt(e.target.value) : e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(updateVehicle(vehicle));
    props.onHide();
  };

  useEffect(() => {
    setVehicle(props.vehicle);
  }, [props.vehicle]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Vehiculo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Placa: </Form.Label>
            <Form.Control
              disabled
              name="Placa"
              type="text"
              value={vehicle.Placa}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Marca: </Form.Label>
            <Form.Control
              name="Marca"
              type="text"
              value={vehicle.Marca}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Serie: </Form.Label>
            <Form.Control
              name="Serie"
              type="text"
              value={vehicle.Serie}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Modelo: </Form.Label>
            <Form.Control
              name="Modelo"
              type="text"
              value={vehicle.Modelo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color: </Form.Label>
            <Form.Control
              name="Color"
              type="text"
              value={vehicle.Color}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} variant="primary">
          Editar
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DarkExample;

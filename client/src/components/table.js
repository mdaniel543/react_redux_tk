import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { fetchVehicles } from "../features/vehicles/vehicleSlice";

function DarkExample() {
  const {list: vehicles} = useSelector((state) => state.vehicles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  return (
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
                  <Button variant="outline-info">Editar</Button>
                </center>
              </td>
              <td>
                <center>
                  <Button variant="outline-danger">Eliminar</Button>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default DarkExample;

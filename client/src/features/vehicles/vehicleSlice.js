import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const BACK_URL = "http://192.168.122.170:8080";

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState: {
    list: [],
    color: [],
    marca: [],
    modelo: [],
    copy: [],
  },
  reducers: {
    setVehicles: (state, action) => {
      state.list = action.payload;
    },
    SetCopy: (state, action) => {
      state.copy = action.payload;
    },
    addVehicle: (state, action) => {
      state.list.push(action.payload);
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setMarca: (state, action) => {
      state.marca = action.payload;
    },
    setModelo: (state, action) => {
      state.modelo = action.payload;
    },
  },
});

export const { setVehicles, setColor, setMarca, setModelo, SetCopy } =
  vehicleSlice.actions;

export default vehicleSlice.reducer;

export const fetchVehicles = () => async (dispatch) => {
  await axios
    .get(`${BACK_URL}/vehicle`)
    .then((response) => {
      if (response.data !== null) {
        dispatch(setVehicles(response.data));
        dispatch(SetCopy(response.data));
        dispatch(fetchColor(response.data));
        dispatch(fetchMarca(response.data));
        dispatch(fetchModelo(response.data));
      }
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addVehicle = (data, vehicle) => async (dispatch) => {
  console.log(vehicle);
  if (
    vehicle.Color === undefined ||
    vehicle.Marca === undefined ||
    vehicle.Modelo === undefined ||
    vehicle.Placa === undefined ||
    vehicle.Serie === undefined
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, complete todos los campos",
    });
    return;
  }
  const repetido = data.map((element) => {
    console.log(element);
    if (element.Placa === vehicle.Placa) {
      console.log("placa repetida");
      return true;
    }
  });
  if (repetido.includes(true)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La placa ya existe",
    });
    return;
  }
  await axios
    .post(`${BACK_URL}/vehicle`, vehicle)
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: "El Vehiculo se ha agregado correctamente",
        showConfirmButton: false,
        timer: 1800,
      });
      dispatch(fetchVehicles());
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error al agregar el vehiculo",
        showConfirmButton: false,
        timer: 1800,
      });
      console.log(error);
    });
};

export const deleteVehicle = (id) => async (dispatch) => {
  await axios
    .delete(`${BACK_URL}/vehicle/${id}`)
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: "El vehiculo se ha eliminado correctamente",
        showConfirmButton: false,
        timer: 1800,
      });
      dispatch(fetchVehicles());
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error al eliminar el vehiculo",
        showConfirmButton: false,
        timer: 1800,
      });
      console.log(error);
    });
};

export const updateVehicle = (vehicle) => async (dispatch) => {
  await axios
    .put(`${BACK_URL}/vehicle/${vehicle._id}`, vehicle)
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: "El vehiculo se ha actualizado correctamente",
        showConfirmButton: false,
        timer: 1800,
      });
      dispatch(fetchVehicles());
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error al actualizar el vehiculo",
        showConfirmButton: false,
        timer: 1800,
      });
      console.log(error);
    });
};
/************* OBTIENE PROPIEDADES *************/

export const fetchColor = (data) => async (dispatch) => {
  let color = [];
  data.forEach((vehicle) => {
    if (!color.includes(vehicle.Color)) {
      color.push(vehicle.Color);
    }
  });
  console.log(color);
  dispatch(setColor(color));
};

export const fetchMarca = (data) => async (dispatch) => {
  let marca = [];
  data.forEach((vehicle) => {
    if (!marca.includes(vehicle.Marca)) {
      marca.push(vehicle.Marca);
    }
  });
  console.log(marca);
  dispatch(setMarca(marca));
};

export const fetchModelo = (data) => async (dispatch) => {
  let modelo = [];
  data.forEach((vehicle) => {
    if (!modelo.includes(vehicle.Modelo)) {
      modelo.push(vehicle.Modelo);
    }
  });
  console.log(modelo);
  dispatch(setModelo(modelo));
};

/************** FILTRA *****************************/

export const filterColors = (data, color) => async (dispatch) => {
  let temp = [];
  data.forEach((vehicle) => {
    if (vehicle.Color === color) {
      temp.push(vehicle);
    }
  });
  dispatch(setVehicles(temp));
};

export const filterMarca = (data, marca) => async (dispatch) => {
  let temp = [];
  data.forEach((vehicle) => {
    if (vehicle.Marca === marca) {
      temp.push(vehicle);
    }
  });
  console.log(temp);
  dispatch(setVehicles(temp));
};

export const filterModelo = (data, modelo) => async (dispatch) => {
  let temp = [];
  data.forEach((vehicle) => {
    if (vehicle.Modelo === modelo) {
      temp.push(vehicle);
    }
  });
  dispatch(setVehicles(temp));
};

/************************************ */
export const quitFilter =
  (copy, type1, type2, filter1, filter2) => async (dispatch) => {
    let temp = [];
    let temp2 = [];
    if (filter1 !== "") {
      copy.forEach((element) => {
        if (type1 === "color")
          if (element.Color === filter1) temp.push(element);
        if (type1 === "marca")
          if (element.Marca === filter1) temp.push(element);
        if (type1 === "modelo")
          if (element.Modelo === filter1) temp.push(element);
      });
      if (filter2 !== "") {
        temp.forEach((element) => {
          if (type2 === "color")
            if (element.Color === filter2) temp2.push(element);
          if (type2 === "marca")
            if (element.Marca === filter2) temp2.push(element);
          if (type2 === "modelo")
            if (element.Modelo === filter2) temp2.push(element);
        });
        dispatch(setVehicles(temp2));
        return;
      }
      dispatch(setVehicles(temp));
      return;
    } else if (filter2 !== "") {
      copy.forEach((element) => {
        if (type2 === "color")
          if (element.Color === filter2) temp.push(element);
        if (type2 === "marca")
          if (element.Marca === filter2) temp.push(element);
        if (type2 === "modelo")
          if (element.Modelo === filter2) temp.push(element);
      });
      dispatch(setVehicles(temp));
      return;
    }
    dispatch(setVehicles(copy));
  };

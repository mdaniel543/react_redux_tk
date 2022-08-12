import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACK_URL = "http://localhost:8080";

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState: {
    list: [],
  },
  reducers: {
    setVehicles: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setVehicles } = vehicleSlice.actions;

export default vehicleSlice.reducer;

export const fetchVehicles = () => async (dispatch) => {
  await axios
    .get(`${BACK_URL}/vehicle`)
    .then((response) => {
      dispatch(setVehicles(response.data));
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};  

export const addVehicle = (vehicle) => async (dispatch) => {
  await axios
    .post(`${BACK_URL}/vehicle`, vehicle)
    .then((response) => {
      dispatch(fetchVehicles());
    })
    .catch((error) => {
      console.log(error);
    });
};

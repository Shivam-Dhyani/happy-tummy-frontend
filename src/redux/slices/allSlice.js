import { createSlice } from "@reduxjs/toolkit";
import { showToast } from "../../utils/toastService";
import {
  addEmployee,
  addTiffin,
  addVegetable,
  getEmployees,
  getTiffins,
  getVegtables,
} from "../thunks/allThunk";

const initialState = {
  employeesData: [],
  employeesDataStatus: "idle",
  addEmployeeData: [],
  addEmployeeDataStatus: "idle",
  vegetablesData: [],
  vegetablesDataStatus: "idle",
  addVegetableData: [],
  addVegetableDataStatus: "idle",
  tiffinsData: [],
  tiffinsDataStatus: "idle",
  addTiffinData: [],
  addTiffinDataStatus: "idle",
};

export const allSlice = createSlice({
  name: "all",
  initialState,
  reducers: {
    resetEmployeeDataStatus(state) {
      state.employeesDataStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // INFO: Get All Employees List API
      .addCase(getEmployees.pending, (state) => {
        state.employeesDataStatus = "loading";
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.employeesDataStatus = "success";
        state.employeesData = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.employeesDataStatus = "failed";
        showToast(action?.payload?.message || null, "error");
      })
      // INFO: Add New Employee API
      .addCase(addEmployee.pending, (state) => {
        state.addEmployeeDataStatus = "loading";
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.addEmployeeDataStatus = "success";
        state.addEmployeeData = action.payload;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.addEmployeeDataStatus = "failed";
        showToast(action?.payload?.message || null, "error");
      })
      // INFO: Get Vegetable List by date API
      .addCase(getVegtables.pending, (state) => {
        state.vegetablesDataStatus = "loading";
      })
      .addCase(getVegtables.fulfilled, (state, action) => {
        state.vegetablesDataStatus = "success";
        state.vegetablesData = action.payload;
      })
      .addCase(getVegtables.rejected, (state, action) => {
        state.vegetablesDataStatus = "failed";
        showToast(action?.payload?.message || null, "error");
      })
      // INFO: Add New Vegetable API
      .addCase(addVegetable.pending, (state) => {
        state.addVegetableDataStatus = "loading";
      })
      .addCase(addVegetable.fulfilled, (state, action) => {
        state.addVegetableDataStatus = "success";
        state.addVegetableData = action.payload;
      })
      .addCase(addVegetable.rejected, (state, action) => {
        state.addVegetableDataStatus = "failed";
        showToast(action?.payload?.message || null, "error");
      })
      // INFO: Get Tiffins for date range or for single date API
      .addCase(getTiffins.pending, (state) => {
        state.tiffinsDataStatus = "loading";
      })
      .addCase(getTiffins.fulfilled, (state, action) => {
        state.tiffinsDataStatus = "success";
        state.tiffinsData = action.payload;
      })
      .addCase(getTiffins.rejected, (state, action) => {
        state.tiffinsDataStatus = "failed";
        showToast(action?.payload?.message || null, "error");
      })
      // INFO: Add New Tiffin for a specific date API
      .addCase(addTiffin.pending, (state) => {
        state.addTiffinDataStatus = "loading";
      })
      .addCase(addTiffin.fulfilled, (state, action) => {
        state.addTiffinDataStatus = "success";
        state.addTiffinData = action.payload;
      })
      .addCase(addTiffin.rejected, (state, action) => {
        state.addTiffinDataStatus = "failed";
        showToast(action?.payload?.message || null, "error");
      });
  },
});

export default allSlice.reducer;
export const { resetEmployeeDataStatus } = allSlice.actions;

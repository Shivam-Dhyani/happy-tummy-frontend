import { createSlice } from "@reduxjs/toolkit";
import { showToast } from "../../utils/toastConfig";
import {
  addEmployee,
  addTiffin,
  addVegetable,
  getEmployees,
  getTiffinsForDate,
  getTiffinsForDateRange,
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
  tiffinsDateData: [],
  tiffinsDateDataStatus: "idle",
  tiffinsDateInRangeData: [],
  tiffinsDateInRangeDataStatus: "idle",
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
    resetAddEmployeeDataStatus(state) {
      state.addEmployeeDataStatus = "idle";
    },
    resetVegetablesDataStatus(state) {
      state.vegetablesDataStatus = "idle";
    },
    resetAddVegetableDataStatus(state) {
      state.addVegetableDataStatus = "idle";
    },
    resetTiffinsDataStatus(state) {
      state.tiffinsDateDataStatus = "idle";
    },
    resetAddTiffinDataStatus(state) {
      state.addTiffinDataStatus = "idle";
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
        state.employeesData = [];
        showToast(action?.payload?.error || "Network Issue", "error");
      })
      // INFO: Add New Employee API
      .addCase(addEmployee.pending, (state) => {
        state.addEmployeeDataStatus = "loading";
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.addEmployeeDataStatus = "success";
        state.addEmployeeData = action.payload;
        state.employeesData.push(action?.payload?.employee);
        showToast("Employee Added Successfully", "success");
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.addEmployeeDataStatus = "failed";
        showToast(action?.payload?.error || "Network Issue", "error");
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
        state.vegetablesData = [];
        showToast(action?.payload?.error || "Network Issue", "error");
      })
      // INFO: Add New Vegetable API
      .addCase(addVegetable.pending, (state) => {
        state.addVegetableDataStatus = "loading";
      })
      .addCase(addVegetable.fulfilled, (state, action) => {
        state.addVegetableDataStatus = "success";
        state.addVegetableData = action.payload;
        showToast("Vegetable Added Successfully", "success");
      })
      .addCase(addVegetable.rejected, (state, action) => {
        state.addVegetableDataStatus = "failed";
        showToast(action?.payload?.error || "Network Issue", "error");
      })
      // INFO: Get Tiffins from for single date API
      .addCase(getTiffinsForDate.pending, (state) => {
        state.tiffinsDateDataStatus = "loading";
      })
      .addCase(getTiffinsForDate.fulfilled, (state, action) => {
        state.tiffinsDateDataStatus = "success";
        state.tiffinsDateData = action.payload;
      })
      .addCase(getTiffinsForDate.rejected, (state, action) => {
        state.tiffinsDateDataStatus = "failed";
        state.tiffinsDateData = [];
        showToast(action?.payload?.error || "Network Issue", "error");
      })
      // INFO: Get Tiffins from date range API
      .addCase(getTiffinsForDateRange.pending, (state) => {
        state.tiffinsDateInRangeDataStatus = "loading";
      })
      .addCase(getTiffinsForDateRange.fulfilled, (state, action) => {
        state.tiffinsDateInRangeDataStatus = "success";
        state.tiffinsDateInRangeData = action.payload;
      })
      .addCase(getTiffinsForDateRange.rejected, (state, action) => {
        state.tiffinsDateInRangeDataStatus = "failed";
        state.tiffinsDateInRangeData = [];
        showToast(action?.payload?.error || "Network Issue", "error");
      })
      // INFO: Add New Tiffin for a specific date API
      .addCase(addTiffin.pending, (state) => {
        state.addTiffinDataStatus = "loading";
      })
      .addCase(addTiffin.fulfilled, (state, action) => {
        state.addTiffinDataStatus = "success";
        state.addTiffinData = action.payload;
        showToast("Tiffin Added Successfully", "success");
      })
      .addCase(addTiffin.rejected, (state, action) => {
        state.addTiffinDataStatus = "failed";
        showToast(action?.payload?.error || "Network Issue", "error");
      });
  },
});

export default allSlice.reducer;
export const {
  resetEmployeeDataStatus,
  resetAddEmployeeDataStatus,
  resetVegetablesDataStatus,
  resetAddVegetableDataStatus,
  resetTiffinsDataStatus,
  resetAddTiffinDataStatus,
} = allSlice.actions;

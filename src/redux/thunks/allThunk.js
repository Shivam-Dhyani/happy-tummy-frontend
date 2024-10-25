import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../../utils/axiosService";

// INFO: Get All Employees List API
export const getEmployees = createAsyncThunk(
  "all/getEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosService.get(`/employees`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// INFO: Add New Employee API
export const addEmployee = createAsyncThunk(
  "all/addEmployee",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosService.post(`/employees`, payload);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// INFO: Get Vegetable List by date API
export const getVegtables = createAsyncThunk(
  "all/getVegtables",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosService.get(
        `/vegetables?date=${payload?.date}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// INFO: Add New Vegetable API
export const addVegetable = createAsyncThunk(
  "all/addVegetable",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosService.post(`/vegetables/add`, payload);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// INFO: Get Tiffins for date range or for single date API
export const getTiffins = createAsyncThunk(
  "all/getTiffins",
  async (payload = { start: "", end: "" }, { rejectWithValue }) => {
    try {
      const response = await axiosService.get(
        payload?.end
          ? `/vegetables?start=${payload?.start}&end=${payload?.end}`
          : `/vegetables?start=${payload?.start}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// INFO: Add New Tiffin for a specific date API
export const addTiffin = createAsyncThunk(
  "all/addTiffin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosService.post(`/tiffin/select`, payload);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

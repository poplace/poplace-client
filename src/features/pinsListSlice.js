import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_SERVER_URL } from "@env";

export const getPinsList = createAsyncThunk("pin/getPinsList", async (location) => {
  const response = await axios.get(`${API_SERVER_URL}/pins`, { params: location });

  return response.data;
});

const initialState = {
  pinsList: [
    {
      _id: null,
      createAt: null,
      creator: null,
      dist: {
        calculated: null,
      },
      image: [],
      position: {
        coordinates: [null, null],
      },
      tags: [],
      text: null,
    },
  ],
  status: "idle",
  error: null,
};

const pinsListSlice = createSlice({
  name: "pinsList",
  initialState,
  reducers: {},
  extraReducers: {
    [getPinsList.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [getPinsList.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "success";
      }
      state.pinsList = action.payload.pinsList;
    },
    [getPinsList.rejected]: (state, action) => {
      state.error = action.error;
      state.status = "failed";
    },
  },
});

export default pinsListSlice.reducer;

export const selectPinsList = (state) => state.pinsList;

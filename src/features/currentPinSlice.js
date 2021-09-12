import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pinId: null,
  creator: null,
  image: [],
  text: null,
  tag: [],
  viewedUsers: [],
  savedUser: null,
  saveAt: null,
  location: null,
};

const currentPinSlice = createSlice({
  name: "currentPin",
  initialState,
  reducers: {
    addCurrentPin: (state, action) => {
      state = { ...action.payload };
      return state;
    },
  },
});

export const { addCurrentPin } = currentPinSlice.actions;

export default currentPinSlice.reducer;

export const selectCurrentPin = (state) => state.currentPin;

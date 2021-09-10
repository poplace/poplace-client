import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_SERVER_URL } from "@env";

export const signinUser = createAsyncThunk("user/signinUserStatus", async (user) => {
  const { email } = user;
  const response = await axios.post(`${API_SERVER_URL}/users/login`,
    { email },
    {
      headers: {
        "Content-Type": "application/json"
      },
    }
  );

  const { id, token, nickname, image, pushAlarmStatus, isOriginalMember } = response.data;

  await SecureStore.setItemAsync("token", token);

  return {
    info: {
      id,
      email,
      nickname,
      image,
      isOriginalMember,
      pushAlarmStatus,
    },
  };
});

const initialState = {
  info: {
    id: null,
    email: null,
    nickname: null,
    image: null,
    isOriginalMember: null,
    pushAlarmStatus: null,
  },
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: () => {
      SecureStore.deleteItemAsync("token");

      return initialState;
    },
    addImage: (state, action) => {
      state.info.image = action.payload;

      return state;
    },
    addNickname: (state, action) => {
      state.info.nickname = action.payload;

      return state;
    },
  },
  extraReducers: {
    [signinUser.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [signinUser.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.info = action.payload.info;
        state.status = "success";
      }
    },
    [signinUser.rejected]: (state, action) => {
      state.error = action.error;
      state.status = "failed";
    },
  },
});

export const { logoutUser, addImage, addNickname } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state) => state.user.info;

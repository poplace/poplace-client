import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { API_SERVER_URL } from "@env";

export const signinUser = createAsyncThunk(
  "user/signinUserStatus",
  async (user) => {
    const { email } = user;
    const body = { email };
    const result = await axios.post(
      `${API_SERVER_URL}/users/login`,
      body
    );

    const { token, isOriginalMember, image, pushAlarmStatus, nickName } = result;
    await SecureStore.setItemAsync("token", token);

    return {
      info: {
        email,
        // nickname,
        // image,
        // isOriginalMember,
        // pushAlarmStatus,
      }
    };
  }
);

const initialState = {
  info: {
    email: null,
    // image: null,
    // nickname: null,
    // pushAlarmStatus: null,
    // isOriginalMember: null,
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
  },
  extraReducers: {
    [signinUser.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [signinUser.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.info = action.payload;
        state.status = "idle";
      }
    },
    [signinUser.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.error = action.error;
        state.status = "idle";
      }
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state) => state.user.info;
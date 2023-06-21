import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CartStateType } from "../context/CartProvider";
import type { RootState } from "./store";
import axios from "axios";

const USER_URL = "api/v1/users";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get(`${USER_URL}/getUser`);
  return response.data.user;
});

interface UserType {
  userName: string;
  email: string;
  password: string;
  carts: CartStateType[];
  _id: string;
}

const initUser: UserType = {
  userName: "",
  email: "",
  password: "",
  carts: [],
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initUser },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initUser;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage on app start
const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: storedUser?.user || null,
  token: storedUser?.token || null,
  isAuthenticated: !!storedUser?.token,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // Save to localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        })
      );
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

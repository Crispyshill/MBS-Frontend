import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  externalId: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  externalId: null,
  isAuthenticated: false,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; externalId: string }>) {      
      state.isAuthenticated = true;
      state.token = action.payload.token; // Save token
      state.externalId = action.payload.externalId
      localStorage.setItem("authToken", action.payload.token); // Persist token
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("authToken"); // Clear token
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggingOut: false,
    logoutError: null,
  },
  reducers: {
    logoutUserStart: (state) => {
      state.isLoggingOut = true;
      state.logoutError = null;
    },
    logoutUserSuccess: (state) => {
      state.isLoggingOut = false;
    },
    logoutUserFailure: (state, action) => {
      state.isLoggingOut = false;
      state.logoutError = action.payload;
    },
  },
});

export const { logoutUserStart, logoutUserSuccess, logoutUserFailure } = authSlice.actions;
export default authSlice.reducer;

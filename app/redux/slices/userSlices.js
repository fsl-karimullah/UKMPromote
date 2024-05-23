// userSlices.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    isLogin: false,
  },
  reducers: {
    registerUser: (state, action) => {
      state.data = action.payload;
      state.isLogin = true;
    },
    resetUser: (state) => {
      state.data = {};
      state.isLogin = false;
    },
  },
});

export const { registerUser, resetUser } = userSlice.actions;
export default userSlice.reducer;

// userSelectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectUserData = createSelector(
  state => state.user.data,
  userData => userData
);

export const selectIsLogin = createSelector(
  state => state.user.isLogin,
  isLogin => isLogin
);

// userSelectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectUserData = createSelector(
  state => state.user.data,
  userData => userData
);

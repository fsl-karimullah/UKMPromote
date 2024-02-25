import { createSelector } from '@reduxjs/toolkit';

export const selectCategoryData = createSelector(
  state => state.category,
  category => category.category
);

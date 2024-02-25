import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState, 
  reducers: {
    fetchCategoryStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCategorySuccess(state, action) {
      state.loading = false;
      state.category = action.payload;
    },
    fetchCategoryFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;

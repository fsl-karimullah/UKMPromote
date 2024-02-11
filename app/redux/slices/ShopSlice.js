// ShopSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  shops: [], 
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    fetchShopDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchShopDataSuccess(state, action) {
      state.loading = false;
      state.shops = action.payload;
    },
    fetchShopDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchShopDataStart, fetchShopDataSuccess, fetchShopDataFailure } = shopSlice.actions;
export default shopSlice.reducer;

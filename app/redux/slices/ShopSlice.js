import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  shops: [],
  allShops: [],
  selectedShop: {
    data: null,
    loading: false, 
  },
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
    fetchShopDataSuccessAll(state, action) {
      state.loading = false;
      state.allShops = action.payload;
    },
    fetchShopDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getShopDetailStart(state) { 
      state.selectedShop.loading = true;
      state.selectedShop.data = null; 
    },
    getShopDetailSuccess(state, action) {
      state.selectedShop.loading = false;
      state.selectedShop.data = action.payload;
    },
    getShopDetailFailure(state) { 
      state.selectedShop.loading = false;
    },
  },
});

export const {
  fetchShopDataStart,
  fetchShopDataSuccess,
  fetchShopDataSuccessAll,
  fetchShopDataFailure,
  getShopDetailStart,
  getShopDetailSuccess,
  getShopDetailFailure,
} = shopSlice.actions;

export default shopSlice.reducer;

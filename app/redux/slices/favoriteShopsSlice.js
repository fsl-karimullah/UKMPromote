// favoriteShopsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoriteShopsSlice = createSlice({
  name: 'favoriteShops',
  initialState: {
    shops: [], 
  },
  reducers: {
    addFavoriteShop: (state, action) => {
      const existingShop = state.shops.find(shop => shop.id === action.payload.id);

      if (!existingShop) {
        state.shops.push(action.payload);
      }
    },
    removeFavoriteShop: (state, action) => {
      state.shops = state.shops.filter(shop => shop.id !== action.payload.id);
    },
  },
});

export const { addFavoriteShop, removeFavoriteShop } = favoriteShopsSlice.actions;
export default favoriteShopsSlice.reducer;

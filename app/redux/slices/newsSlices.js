import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  news: [],
  loading: false,
  error: null,
  allNews: []
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    fetchNewsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchNewsSuccess(state, action) {
      state.loading = false;
      state.news = action.payload;
    },
    fetchAllNewsSuccess(state, action) {
      state.loading = false;
      state.allNews = action.payload;
    },
    fetchNewsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchNewsStart,
  fetchNewsSuccess,
  fetchAllNewsSuccess,
  fetchNewsFailure
} = newsSlice.actions;

export default newsSlice.reducer;

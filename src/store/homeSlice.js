import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGeners: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { getApiConfiguration, getGeners } = homeSlice.actions;

export default homeSlice.reducer;

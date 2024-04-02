import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  priceFilter: null, 
  ratingFilter: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
    setRatingFilter: (state, action) => {
      state.ratingFilter = action.payload;
    },
    clearFilters: (state) => {
      state.priceFilter = null;
      state.ratingFilter = null;
    },
  },
});

export const { setPriceFilter, setRatingFilter, clearFilters } = filterSlice.actions;
export const getPriceFilter = (state) => state.filter.priceFilter;
export const getRatingFilter = (state) => state.filter.ratingFilter;

export default filterSlice.reducer;

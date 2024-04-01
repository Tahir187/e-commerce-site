import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

const initialState = {
  category: [],
  categoriesStatus: STATUS.IDLE,
  categoryProducts: [],
  categoryProductsStatus: STATUS.IDLE,
};

export const filterSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    productReducer: (state, action) => {
      switch (action.type) {
        case "SORT_BY_PRICE":
          return { ...state, sort: action.payload };

        case "FILTER_BY_RATING":
          return { ...state, rating: action.payload };

        default:
          return state;
      }
    },
  },
});

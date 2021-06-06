import { createSlice, createSelector } from "@reduxjs/toolkit";

import { fetchAllProducts, fetchProductById } from "../../api";

const product = createSlice({
  name: "product",
  initialState: { products: [], error: null, isFetching: false },
  reducers: {
    fetchProductsStart: (state, action) => {
      state.isFetching = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.isFetching = false;
    },

    fetchProductsFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export default product.reducer;
export const {} = product.actions;

export const fetchAllProductsAsync = () => (dispatch, getState) => {
  const { fetchProductsFailure, fetchProductsStart, fetchProductsSuccess } =
    product.actions;
  dispatch(fetchProductsStart());

  fetchAllProducts()
    .then(({ data }) => {
      dispatch(fetchProductsSuccess(data));
    })
    .catch((error) => {
      dispatch(fetchProductsFailure(error.message));
    });
};

export const getAllProducts = createSelector(
  (state) => state.product,
  (product) => product.products
);

export const getProductById = (id) =>
  createSelector(getAllProducts, (products) => {
    console.log("getProductbyid : ", products);

    return products ? products.find((p) => p._id === id) : null;
  });

import { createSlice, createSelector } from '@reduxjs/toolkit';

import { fetchAllProducts } from '../../services/productService';

const product = createSlice({
  name: 'product',
  initialState: {
    products: [],
    error: null,
    isFetching: false,
    filterOptions: { searchKey: '', sortBy: 'popular', category: 'all' },
  },
  reducers: {
    fetchProductsStart: (state, action) => {
      state.isFetching = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.error = null;
      state.isFetching = false;
    },

    fetchProductsFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    setFilterOptions: (state, action) => {
      const { searchKey, sortBy, category } = action.payload;
      state.filterOptions.searchKey = searchKey.toLowerCase();
      state.filterOptions.sortBy = sortBy;
      state.filterOptions.category = category;
    },
  },
});

export default product.reducer;
export const { setFilterOptions } = product.actions;

export const fetchAllProductsAsync = () => (dispatch, getState) => {
  const { fetchProductsFailure, fetchProductsStart, fetchProductsSuccess } =
    product.actions;
  dispatch(fetchProductsStart());

  fetchAllProducts()
    .then((res) => {
      return dispatch(fetchProductsSuccess(res.data));
    })
    .catch((error) => {
      if (error.response)
        return dispatch(fetchProductsFailure(error.response.data));
      else
        return dispatch(
          fetchProductsFailure('Internal Server Error, Try After Some time.')
        );
    });
};

export const getAllProducts = createSelector(
  (state) => state.product,
  (product) => product.products
);

export const getProductById = (id) =>
  createSelector(getAllProducts, (products) => {
    return products ? products.find((p) => p._id === id) : null;
  });

export const getFilteredProducts = createSelector(
  (state) => state.product,
  (product) => {
    let filteredProducts;
    const { searchKey, sortBy, category } = product.filterOptions;
    const allProducts = product.products;

    filteredProducts = allProducts.filter(
      (currProduct) => category === 'all' || currProduct.category === category
    );

    if (searchKey) {
      filteredProducts = filteredProducts.filter((currProduct) =>
        currProduct.name.toLowerCase().includes(searchKey)
      );
    }

    if (sortBy === 'popular') {
      filteredProducts.sort((p1, p2) => p2.rating - p1.rating);
    } else if (sortBy === 'lowToHigh') {
      filteredProducts.sort((p1, p2) => p1.price - p2.price);
    } else {
      filteredProducts.sort((p1, p2) => p2.price - p1.price);
    }
    return filteredProducts;
  }
);

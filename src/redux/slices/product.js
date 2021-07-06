import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getCurrentUser } from '../../services/authService';

import {
  fetchAllProducts,
  addProductReview,
} from '../../services/productService';

const product = createSlice({
  name: 'product',
  initialState: {
    products: [],
    error: null,
    isFetching: false,
    filterOptions: { searchKey: '', sortBy: 'popular', category: 'all' },
    submittingReview: false,
  },
  reducers: {
    fetchProductsRequest: (state, action) => {
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
    addProductReviewRequest: (state, action) => {
      state.submittingReview = true;
    },
    addProductReviewSuccess: (state, action) => {
      const product = action.payload;
      const productFromStore = state.products.find(
        (p) => p._id === product._id
      );
      productFromStore.reviews = product.reviews;
      productFromStore.rating = product.rating;
      state.submittingReview = false;
      state.error = null;
    },
    addProductReviewFailure: (state, action) => {
      state.error = action.payload;
      state.submittingReview = false;
    },
  },
});

export default product.reducer;
export const { setFilterOptions } = product.actions;

export const fetchAllProductsAsync = () => (dispatch) => {
  const { fetchProductsFailure, fetchProductsRequest, fetchProductsSuccess } =
    product.actions;
  dispatch(fetchProductsRequest());

  fetchAllProducts()
    .then((res) => {
      return dispatch(fetchProductsSuccess(res.data));
    })
    .catch((error) => {
      console.log(error);
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

export const addProductReviewAsync = (productId, review) => (dispatch) => {
  const {
    addProductReviewRequest,
    addProductReviewSuccess,
    addProductReviewFailure,
  } = product.actions;
  dispatch(addProductReviewRequest());

  const currentUser = getCurrentUser();
  addProductReview(productId, review, currentUser)
    .then((res) => dispatch(addProductReviewSuccess(res.data)))
    .catch((err) => {
      if (err.response) {
        dispatch(addProductReviewFailure(err.response.data));
      } else {
        dispatch(
          addProductReviewFailure('Internal Server Error, Try After Some time.')
        );
      }
    });
};

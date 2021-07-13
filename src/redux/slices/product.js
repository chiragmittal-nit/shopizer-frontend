import { createSlice, createSelector } from '@reduxjs/toolkit';
import {
  addProduct,
  deleteProduct,
  updateProductDetails,
} from '../../services/adminService';
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
    addProductRequest: (state, action) => {
      state.isFetching = true;
    },
    addProductSuccess: (state, action) => {
      const newProduct = action.payload;
      state.products.push(newProduct);
      state.error = null;
      state.isFetching = false;
    },
    addProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
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

    updateProductDetailsRequest: (state, action) => {
      state.isFetching = true;
      state.error = null;
    },

    updateProductDetailsSuccess: (state, action) => {
      const updatedProduct = action.payload;
      const updatedProductIdx = state.products.findIndex(
        (product) => product._id === updatedProduct._id
      );
      state.products[updatedProductIdx] = updatedProduct;
      state.error = null;
      state.isFetching = false;
    },
    updateProductDetailsFailure: (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
    },
    deleteProductRequest: (state, action) => {
      state.isFetching = true;
    },
    deleteProductSuccess: (state, action) => {
      const deletedProduct = action.payload;
      const deletedProductIdx = state.products.findIndex(
        (product) => product._id === deletedProduct._id
      );
      state.products.splice(deletedProductIdx, 1);
      state.error = null;
      state.isFetching = false;
    },
    deleteProductFailure: (state, action) => {
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
    console.log('inside getProductById');
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

export const deleteProductAsync = (id) => (dispatch) => {
  const { deleteProductRequest, deleteProductSuccess, deleteProductFailure } =
    product.actions;
  dispatch(deleteProductRequest());

  deleteProduct(id)
    .then((res) => {
      dispatch(deleteProductSuccess(res.data));
      console.log(window.location);
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        dispatch(deleteProductFailure(err.response.data));
      } else {
        dispatch(deleteProductFailure('Internal Server Error!'));
      }
    });
};

export const addProductAsync = (newProduct) => (dispatch) => {
  const { addProductRequest, addProductSuccess, addProductFailure } =
    product.actions;

  dispatch(addProductRequest());

  addProduct(newProduct)
    .then((res) => {
      dispatch(addProductSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        dispatch(addProductFailure(err.response.data));
      } else {
        dispatch(addProductFailure('Internal Server Error!'));
      }
    });
};

export const updateProductDetailsAsync = (updatedProduct) => (dispatch) => {
  const {
    updateProductDetailsRequest,
    updateProductDetailsSuccess,
    updateProductDetailsFailure,
  } = product.actions;

  dispatch(updateProductDetailsRequest());

  updateProductDetails(updatedProduct)
    .then((res) => {
      dispatch(updateProductDetailsSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        dispatch(updateProductDetailsFailure(err.response.data));
      } else {
        dispatch(updateProductDetailsFailure('Internal Server Error!'));
      }
    });
};

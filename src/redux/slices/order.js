import { createSlice, createSelector } from '@reduxjs/toolkit';
import {
  fetchOrdersListByUserId,
  placeOrder,
} from '../../services/orderService';

const order = createSlice({
  name: 'order',
  initialState: {},
  reducers: {
    placeOrderRequest: (state, action) => {
      state.isLoading = true;
    },
    placeOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.orderDetails = action.payload;
    },
    placeOrderFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    fetchOrdersListRequest: (state, action) => {
      state.isLoading = true;
    },

    fetchOrdersListSuccess: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    fetchOrdersListFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default order.reducer;

export const placeOrderAsync = (token, amount) => (dispatch, getState) => {
  const { placeOrderRequest, placeOrderSuccess, placeOrderFailure } =
    order.actions;
  dispatch(placeOrderRequest());

  const currUser = getState().user.currentUser;

  // we need to delete countInStock Property of each cartItems
  const cartItems = Object.values(getState().cart.items).map(
    ({ countInStock, ...otherProperties }) => otherProperties
  );

  placeOrder(token, cartItems, currUser, amount)
    .then((res) => dispatch(placeOrderSuccess(res.data)))
    .catch((err) => dispatch(placeOrderFailure(err.response.data)));
};

export const fetchOrdersListByUserIdAsync = () => (dispatch, getState) => {
  const {
    fetchOrdersListRequest,
    fetchOrdersListSuccess,
    fetchOrdersListFailure,
  } = order.actions;
  dispatch(fetchOrdersListRequest());

  fetchOrdersListByUserId(getState().user.currentUser._id)
    .then((res) => dispatch(fetchOrdersListSuccess(res.data)))
    .catch((error) => {
      if (error.response) dispatch(fetchOrdersListFailure(error.response.data));
      else
        dispatch(
          fetchOrdersListFailure('Internal Server Error, Try After Some time.')
        );
    });
};

const getAllOrders = createSelector(
  (state) => state.order,
  (order) => order.orders
);

export const getOrderById = (orderId) =>
  createSelector(getAllOrders, (orders) =>
    orders ? orders.find((order) => order._id === orderId) : null
  );

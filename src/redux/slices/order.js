import { createSlice } from '@reduxjs/toolkit';
import { placeOrder } from '../../services/orderService';

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
  },
});

export default order.reducer;
export const {} = order.actions;

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

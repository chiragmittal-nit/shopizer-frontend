import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cart',
  initialState: { items: null, totalQuantity: 0 },
  reducers: {
    addItem: (state, action) => {
      const { product, quantity } = action.payload;

      state['totalQuantity'] += Number(quantity);

      if (!state['items']) state['items'] = {};

      if (state['items'][product._id]) {
        state['items'][product._id].quantity =
          Number(state['items'][product._id].quantity) + Number(quantity);
      } else {
        state['items'][product._id] = { ...product, quantity };
      }
    },

    updateItem: (state, action) => {
      const { product, quantity: newQuantity } = action.payload;

      state.totalQuantity += newQuantity - product.quantity;
      state.items[product._id].quantity = newQuantity;
    },
    deleteItem: (state, action) => {
      const { product } = action.payload;
      state.totalQuantity -= product.quantity;
      delete state.items[product._id];
      if (state.totalQuantity === 0) state.items = null;
    },

    emptyCart: (state, action) => {
      state.items = null;
      state.totalQuantity = 0;
    },
  },
});

export default cart.reducer;
export const { addItem, updateItem, deleteItem, emptyCart } = cart.actions;

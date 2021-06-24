import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addItem: (state, action) => {
      const { product, quantity } = action.payload;

      state['totalQuantity']
        ? (state['totalQuantity'] += Number(quantity))
        : (state['totalQuantity'] = Number(quantity));

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
      console.log(product);
      state.totalQuantity -= product.quantity;
      delete state.items[product._id];
    },
  },
});

export default cart.reducer;
export const { addItem, updateItem, deleteItem } = cart.actions;

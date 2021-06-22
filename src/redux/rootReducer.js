import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productReducer from './slices/product.js';
import cartReducer from './slices/cart.js';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['product', 'cart'],
};

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);

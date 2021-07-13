import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productReducer from './slices/product.js';
import cartReducer from './slices/cart.js';
import userReducer from './slices/user.js';
import orderReducer from './slices/order.js';
import adminReducer from './slices/admin.js';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['product', 'cart'],
};

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
  admin: adminReducer,
});

export default persistReducer(persistConfig, rootReducer);

import { combineReducers } from "redux";

import productReducer from "./slices/product.js";

const rootReducer = combineReducers({
  product: productReducer,
});

export default rootReducer;

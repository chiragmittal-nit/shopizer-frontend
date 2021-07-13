import http from './httpService';

const apiEndpoint = process.env.REACT_APP_apiUrl + '/orders';

export const placeOrder = (token, cartItems, currUser, amount) =>
  http.post(apiEndpoint, { token, cartItems, currUser, amount });

export const fetchOrdersListByUserId = (userId) =>
  http.get(apiEndpoint + `/user/?userId=${userId}`);

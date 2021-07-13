import http from './httpService';

const apiEndpointUsers = process.env.REACT_APP_apiUrl + '/users';
const apiEndpointProducts = process.env.REACT_APP_apiUrl + '/products';
const apiEndpointOrders = process.env.REACT_APP_apiUrl + '/orders';

export const fetchAllUsers = () => http.get(apiEndpointUsers);

export const deleteUser = (id) => http.delete(apiEndpointUsers + `/${id}`);

export const addProduct = (product) => http.post(apiEndpointProducts, product);

export const updateProductDetails = (product) => {
  console.log(product);
  return http.put(apiEndpointProducts + `/${product._id}`, product);
};

export const deleteProduct = (id) =>
  http.delete(apiEndpointProducts + `/${id}`);

export const fetchAllOrdersList = () => http.get(apiEndpointOrders);

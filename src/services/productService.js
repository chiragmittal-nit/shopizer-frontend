import http from './httpService';

const apiEndpoint = process.env.REACT_APP_apiUrl + '/products';
export const fetchAllProducts = () => http.get(apiEndpoint);

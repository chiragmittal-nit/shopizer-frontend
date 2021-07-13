import http from './httpService';

const apiEndpoint = process.env.REACT_APP_apiUrl + '/users';

export const registerUser = (user) => http.post(apiEndpoint, user);

export const updateUserDetails = (id, updatedUser) =>
  http.put(apiEndpoint + `/${id}`, updatedUser);

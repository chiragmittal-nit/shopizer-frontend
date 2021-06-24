import jwt from 'jsonwebtoken';
import http from './httpService';

const apiEndpoint = process.env.REACT_APP_apiUrl + '/auth';
const tokenKey = process.env.REACT_APP_tokenKey;

http.setJwt(getJwt());

export const loginUser = (credentials) => http.post(apiEndpoint, credentials);

export const loginWithJwt = (jwt_token) => {
  localStorage.setItem(tokenKey, jwt_token);
};

export const logout = () => {
  localStorage.removeItem(tokenKey);
};

export function getCurrentUser() {
  try {
    const jwt_token = localStorage.getItem(tokenKey);
    return jwt.decode(jwt_token);
  } catch (err) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const auth = {
  loginUser,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
export default auth;

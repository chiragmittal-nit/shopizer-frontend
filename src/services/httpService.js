import axios from 'axios';

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
export default http;

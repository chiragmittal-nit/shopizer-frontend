import axios from "axios";
const url = "http://localhost:5000";

export const fetchAllProducts = async () => axios.get(url + "/api/products");
export const fetchProductById = async (id) =>
  axios.get(url + `/api/product/${id}`);

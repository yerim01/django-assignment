import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Fetch Products
export const fetchProducts = async () => {
  const response = await API.get("/products/");
  console.log("response:", response.data);
  return response.data;
};

// Fetch Categories
export const fetchCategories = async () => {
  const response = await API.get("/categories/");
  return response.data;
};

// Fetch Tags
export const fetchTags = async () => {
  const response = await API.get("/tags/");
  return response.data;
};

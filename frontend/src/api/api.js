import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Fetch Products
export const fetchProducts = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.category) params.append("category", filters.category);
  if (filters.tags && filters.tags.length > 0) {
    filters.tags.forEach((tagId) => params.append("tags", tagId));
  }

  const response = await API.get(`/products/?${params.toString()}`);
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

import api from "./api";

export const fetchCategories = () => api.get("/categories");
export const fetchProducts = (categoryId) =>
  api.get("/products", { params: { category: categoryId } });

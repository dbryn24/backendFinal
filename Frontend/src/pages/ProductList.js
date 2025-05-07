import React, { useState, useEffect } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/product";
import api from "../services/api";

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async () => {
    try {
      const res = await fetchProducts(selectedCategory);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}

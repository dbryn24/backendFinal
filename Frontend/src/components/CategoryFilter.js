import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/product";

export default function CategoryFilter({ selectedCategory, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  return (
    <select
      value={selectedCategory || ""}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-2 mb-4"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}

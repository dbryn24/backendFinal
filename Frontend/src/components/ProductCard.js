import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover mb-2 rounded"
      />
      <h2 className="font-semibold mb-1">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <span className="font-bold">${product.price}</span>
    </div>
  );
}

import React from "react";
import { Product } from "@/types/inventory";

interface ProductCardProps {
  product: Product;
  categoryName: string;
  supplierName: string;
  onAddStock: () => void;
  onReduceStock: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  categoryName,
  supplierName,
  onAddStock,
  onReduceStock,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">Category: {categoryName}</p>
      <p className="text-gray-600">Supplier: {supplierName}</p>
      <p className="text-gray-600">Stock: {product.stockQuantity}</p>
      <div className="mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={onAddStock}
        >
          Add
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onReduceStock}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

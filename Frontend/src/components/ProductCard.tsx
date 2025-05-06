import React, { useState } from "react";
import { Product } from "@/types/inventory";
import { categories } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
  categoryName: string;
  supplierName: string;
  onAddStock: () => void;
  onReduceStock: () => void;
  onUpdateProduct: (updatedProduct: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  categoryName,
  supplierName,
  onAddStock,
  onReduceStock,
  onUpdateProduct,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState(product.categoryId);
  const [editedSupplier, setEditedSupplier] = useState(supplierName);

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      categoryId: editedCategory,
      supplierId: editedSupplier, // Simpan nama supplier yang diketik
    };
    onUpdateProduct(updatedProduct);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      {isEditing ? (
        <>
          <select
            value={editedCategory || ""}
            onChange={(e) => setEditedCategory(e.target.value || null)}
            className="border px-2 py-1 rounded w-full mb-2"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={editedSupplier}
            onChange={(e) => setEditedSupplier(e.target.value)}
            placeholder="Enter Supplier Name"
            className="border px-2 py-1 rounded w-full mb-2"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={handleSave}
          >
            Save
          </button>
        </>
      ) : (
        <>
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
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={onReduceStock}
            >
              Remove
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;

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
  onDeleteProduct: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  categoryName,
  supplierName,
  onAddStock,
  onReduceStock,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(product.name || "");
  const [editedCategory, setEditedCategory] = useState(
    product.categoryId || ""
  );
  const [editedSupplier, setEditedSupplier] = useState(
    product.supplierId || ""
  );
  const [editedStock, setEditedStock] = useState(product.stockQuantity || 0);

  const handleSave = () => {
    if (!editedName || !editedCategory || !editedSupplier) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedProduct = {
      ...product,
      name: editedName,
      categoryId: editedCategory,
      supplierId: editedSupplier,
      stockQuantity: editedStock,
    };
    onUpdateProduct(updatedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset nilai input ke data asli produk
    setEditedName(product.name || "");
    setEditedCategory(product.categoryId || "");
    setEditedSupplier(product.supplierId || "");
    setEditedStock(product.stockQuantity || 0);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-start">
      {isEditing ? (
        <>
          {/* Input untuk mengedit nama produk */}
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Enter product name"
            className="border px-2 py-1 rounded w-full mb-2"
          />
          {/* Input untuk mengedit kategori */}
          <select
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
            className="border px-2 py-1 rounded w-full mb-2"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {/* Input untuk mengedit supplier */}
          <input
            type="text"
            value={editedSupplier}
            onChange={(e) => setEditedSupplier(e.target.value)}
            placeholder="Enter supplier name"
            className="border px-2 py-1 rounded w-full mb-2"
          />
          {/* Input untuk mengedit stok */}
          <input
            type="number"
            value={editedStock}
            onChange={(e) => setEditedStock(Number(e.target.value))}
            placeholder="Enter stock quantity"
            className="border px-2 py-1 rounded w-full mb-4"
          />
          {/* Tombol Simpan */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            onClick={handleSave}
          >
            Save
          </button>
          {/* Tombol Batal */}
          <div className="mt-4 w-full text-center">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Informasi Produk */}
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">Supplier: {supplierName}</p>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            {categoryName}
          </span>
          <p className="text-gray-600 mt-2">Stock: {product.stockQuantity}</p>

          {/* Tombol Aksi */}
          <div className="mt-4 flex gap-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={onAddStock}
            >
              Add Stock
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={onReduceStock}
            >
              Reduce Stock
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={onDeleteProduct}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;

import React, { useState } from "react";
import { Product } from "@/types/inventory";
import ProductCard from "./ProductCard";
import { categories } from "@/data/mockData";

interface ProductsGridProps {
  products: Product[];
  onAddStock: (productId: string) => void;
  onReduceStock: (productId: string) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (productId: string) => void; // Tambahkan handler untuk hapus produk
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  onAddStock,
  onReduceStock,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
}) => {
  const [newProductName, setNewProductName] = useState("");
  const [newProductStock, setNewProductStock] = useState(0);
  const [newProductCategory, setNewProductCategory] = useState<string | null>(
    null
  );
  const [newProductSupplier, setNewProductSupplier] = useState("");

  const handleAddProduct = () => {
    if (!newProductName || newProductStock < 0) {
      alert("Please provide valid product details.");
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(), // Generate unique ID
      name: newProductName,
      stockQuantity: newProductStock,
      categoryId: newProductCategory,
      supplierId: newProductSupplier,
    };

    onAddProduct(newProduct);
    setNewProductName("");
    setNewProductStock(0);
    setNewProductCategory(null);
    setNewProductSupplier("");
  };

  return (
    <div>
      {/* Form untuk menambah produk baru */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newProductStock}
            onChange={(e) => setNewProductStock(Number(e.target.value))}
            className="border px-4 py-2 rounded w-full"
          />
          <select
            value={newProductCategory || ""}
            onChange={(e) => setNewProductCategory(e.target.value || null)}
            className="border px-4 py-2 rounded w-full"
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
            placeholder="Enter Supplier Name"
            value={newProductSupplier}
            onChange={(e) => setNewProductSupplier(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Grid produk */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categoryName={
              categories.find((cat) => cat.id === product.categoryId)?.name ||
              "Unknown Category"
            }
            supplierName={product.supplierId || "Unknown Supplier"}
            onAddStock={() => onAddStock(product.id)}
            onReduceStock={() => onReduceStock(product.id)}
            onUpdateProduct={(updatedProduct) => {
              onUpdateProduct(updatedProduct);
            }}
            onDeleteProduct={() => onDeleteProduct(product.id)} // Tambahkan handler hapus produk
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;

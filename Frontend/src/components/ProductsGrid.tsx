import React, { useState } from "react";
import { Product } from "@/types/inventory";
import ProductCard from "./ProductCard";
import { getCategoryById, getSupplierById } from "@/utils/inventoryUtils";
import { updateStock } from "@/data/mockData"; // Import fungsi updateStock

interface ProductsGridProps {
  products: Product[];
  onAddStock: (productId: string) => void;
  onReduceStock: (productId: string) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  onAddStock,
  onReduceStock,
}) => {
  const [productList, setProductList] = useState(products);

  const handleAddStock = (productId: string) => {
    updateStock(productId, 1); // Tambah stok di database
    setProductList([...products]); // Perbarui state di UI
  };

  const handleReduceStock = (productId: string) => {
    updateStock(productId, -1); // Kurangi stok di database
    setProductList([...products]); // Perbarui state di UI
  };

  if (productList.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {productList.map((product) => {
        const category = getCategoryById(product.categoryId);
        const supplier = getSupplierById(product.supplierId);

        return (
          <ProductCard
            key={product.id}
            product={product}
            categoryName={category?.name || "Unknown Category"}
            supplierName={supplier?.name || "Unknown Supplier"}
            onAddStock={() => handleAddStock(product.id)} // Pass Add handler
            onReduceStock={() => handleReduceStock(product.id)} // Pass Reduce handler
          />
        );
      })}
    </div>
  );
};

export default ProductsGrid;

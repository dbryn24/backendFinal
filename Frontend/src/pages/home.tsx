import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import ProductsGrid from "@/components/ProductsGrid";
import { categories, products } from "@/data/mockData";
import { getProductsByCategory } from "@/utils/inventoryUtils";

const Index: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productList, setProductList] = useState(products);
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  // Filter produk berdasarkan kategori yang dipilih
  const filteredProducts = getProductsByCategory(selectedCategory, productList);

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Hapus status login
    navigate("/login"); // Arahkan ke halaman login
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Inventory Management
            </h1>
            <p className="text-gray-600">
              Browse products by category and check stock levels
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            {selectedCategory
              ? categories.find((c) => c.id === selectedCategory)?.name
              : "All Products"}
          </h2>
          <ProductsGrid
            products={filteredProducts}
            onAddStock={(productId) => {
              const updatedProducts = productList.map((product) =>
                product.id === productId
                  ? { ...product, stockQuantity: product.stockQuantity + 1 }
                  : product
              );
              setProductList(updatedProducts);
            }}
            onReduceStock={(productId) => {
              const updatedProducts = productList.map((product) =>
                product.id === productId
                  ? {
                      ...product,
                      stockQuantity: Math.max(product.stockQuantity - 1, 0),
                    }
                  : product
              );
              setProductList(updatedProducts);
            }}
          />
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} InventKu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

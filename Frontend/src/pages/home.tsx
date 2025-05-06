import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { products } from "@/data/mockData";

const Index: React.FC = () => {
  const [productList, setProductList] = useState(products);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk kata kunci pencarian
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  // Filter produk berdasarkan kata kunci pencarian
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Input untuk pencarian */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        {/* Tampilkan produk atau pesan "Not Found" */}
        <div className="mb-6">
          {filteredProducts.length > 0 ? (
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
              onUpdateProduct={(updatedProduct) => {
                const updatedProducts = productList.map((product) =>
                  product.id === updatedProduct.id ? updatedProduct : product
                );
                setProductList(updatedProducts);
              }}
              onAddProduct={(newProduct) => {
                setProductList((prevProducts) => [...prevProducts, newProduct]);
              }}
              onDeleteProduct={(productId) => {
                const updatedProducts = productList.filter(
                  (product) => product.id !== productId
                );
                setProductList(updatedProducts);
              }}
            />
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
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

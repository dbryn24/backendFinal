
import React, { useState } from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import ProductsGrid from '@/components/ProductsGrid';
import { categories } from '@/data/mockData';
import { getProductsByCategory } from '@/utils/inventoryUtils';

const Index: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = getProductsByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Inventory Management</h1>
          <p className="text-gray-600">Browse products by category and check stock levels</p>
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
            {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'All Products'}
          </h2>
          <ProductsGrid products={filteredProducts} />
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Item Nexus Catalog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

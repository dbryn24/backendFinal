
import React from 'react';
import { Product } from '@/types/inventory';
import ProductCard from './ProductCard';
import { getCategoryById, getSupplierById } from '@/utils/inventoryUtils';

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => {
        const category = getCategoryById(product.categoryId);
        const supplier = getSupplierById(product.supplierId);
        
        return (
          <ProductCard
            key={product.id}
            product={product}
            categoryName={category?.name || 'Unknown Category'}
            supplierName={supplier?.name || 'Unknown Supplier'}
          />
        );
      })}
    </div>
  );
};

export default ProductsGrid;

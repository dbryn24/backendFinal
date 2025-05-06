
import React from 'react';
import { Product } from '@/types/inventory';
import { formatCurrency } from '@/utils/inventoryUtils';

interface ProductCardProps {
  product: Product;
  categoryName: string;
  supplierName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, categoryName, supplierName }) => {
  const stockStatus = () => {
    if (product.stockQuantity <= 0) return { color: 'bg-red-100 text-red-700', text: 'Out of stock' };
    if (product.stockQuantity < 10) return { color: 'bg-yellow-100 text-yellow-700', text: 'Low stock' };
    return { color: 'bg-green-100 text-green-700', text: 'In stock' };
  };

  const { color, text } = stockStatus();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow animate-fade-in">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500">Category: {categoryName}</p>
          </div>
          <span className="text-lg font-bold text-inventory-secondary">{formatCurrency(product.price)}</span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Supplier:</span> {supplierName}
            </p>
          </div>
          <div className="flex items-center">
            <span className={`text-xs px-2 py-1 rounded-full ${color}`}>
              {text}
            </span>
            <span className="ml-2 text-sm font-medium">{product.stockQuantity} units</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

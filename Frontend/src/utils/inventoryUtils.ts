
import { categories, products, suppliers } from "../data/mockData";
import { Category, Product, Supplier } from "../types/inventory";

export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find((category) => category.id === categoryId);
};

export const getSupplierById = (supplierId: string): Supplier | undefined => {
  return suppliers.find((supplier) => supplier.id === supplierId);
};

export const getProductsByCategory = (categoryId: string | null): Product[] => {
  if (!categoryId) return products;
  return products.filter((product) => product.categoryId === categoryId);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

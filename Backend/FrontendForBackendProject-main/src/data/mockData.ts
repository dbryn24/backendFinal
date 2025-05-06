
import { Category, Product, Supplier } from "../types/inventory";

export const categories: Category[] = [
  { id: "cat1", name: "Electronics" },
  { id: "cat2", name: "Office Supplies" },
  { id: "cat3", name: "Furniture" },
  { id: "cat4", name: "Kitchen" },
];

export const suppliers: Supplier[] = [
  { id: "sup1", name: "TechGiant Inc." },
  { id: "sup2", name: "Office Solutions Ltd." },
  { id: "sup3", name: "Furniture World" },
  { id: "sup4", name: "Kitchen Essentials" },
];

export const products: Product[] = [
  {
    id: "prod1",
    name: "Laptop",
    categoryId: "cat1",
    supplierId: "sup1",
    price: 999.99,
    stockQuantity: 25,
  },
  {
    id: "prod2",
    name: "Smartphone",
    categoryId: "cat1",
    supplierId: "sup1",
    price: 699.99,
    stockQuantity: 50,
  },
  {
    id: "prod3",
    name: "Tablet",
    categoryId: "cat1",
    supplierId: "sup1",
    price: 399.99,
    stockQuantity: 30,
  },
  {
    id: "prod4",
    name: "Stapler",
    categoryId: "cat2",
    supplierId: "sup2",
    price: 12.99,
    stockQuantity: 100,
  },
  {
    id: "prod5",
    name: "Notebook",
    categoryId: "cat2",
    supplierId: "sup2",
    price: 4.99,
    stockQuantity: 200,
  },
  {
    id: "prod6",
    name: "Desk Chair",
    categoryId: "cat3",
    supplierId: "sup3",
    price: 149.99,
    stockQuantity: 15,
  },
  {
    id: "prod7",
    name: "Desk",
    categoryId: "cat3",
    supplierId: "sup3",
    price: 199.99,
    stockQuantity: 10,
  },
  {
    id: "prod8",
    name: "Blender",
    categoryId: "cat4",
    supplierId: "sup4",
    price: 79.99,
    stockQuantity: 20,
  },
  {
    id: "prod9",
    name: "Toaster",
    categoryId: "cat4",
    supplierId: "sup4",
    price: 39.99,
    stockQuantity: 25,
  },
  {
    id: "prod10",
    name: "Coffee Maker",
    categoryId: "cat4",
    supplierId: "sup4",
    price: 89.99,
    stockQuantity: 15,
  },
];

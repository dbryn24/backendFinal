import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaMinus,
  FaUtensils,
  FaCouch,
  FaBoxes,
  FaTools,
  FaTag,
  FaWarehouse,
  FaTruck,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import "../assets/style/home.css";
import { api, API_BASE_URL } from "../utils/api";

const CATEGORIES = {
  FOOD: {
    name: "Food & Beverage",
    icon: <FaUtensils className="item-icon food" />,
  },
  FURNITURE: {
    name: "Furniture",
    icon: <FaCouch className="item-icon furniture" />,
  },
  SUPPLIES: {
    name: "Supplies",
    icon: <FaBoxes className="item-icon supplies" />,
  },
  EQUIPMENT: {
    name: "Equipment",
    icon: <FaTools className="item-icon equipment" />,
  },
};

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get products
      const products = await api.getAllItems();
      console.log("Products from API:", products);

      // Create a hardcoded categoryMap as fallback
      let categoryMap = {};

      // Try to fetch categories
      try {
        const categoriesResponse = await fetch(`${API_BASE_URL}/category`);
        if (!categoriesResponse.ok) {
          throw new Error(
            `Failed to fetch categories: ${categoriesResponse.status}`
          );
        }
        const categories = await categoriesResponse.json();
        console.log("Categories from API:", categories);

        // Create a lookup map for categories
        categories.forEach((category) => {
          categoryMap[category._id] = category.NamaKategori;
        });
      } catch (categoryError) {
        console.error("Error fetching categories:", categoryError);
        // Continue with empty categoryMap
      }

      const transformedItems = products.map((item) => ({
        id: item._id,
        name: item.NamaProduct || "",
        // Use the category name from our lookup map, or show "Unknown Category" if not found
        category: categoryMap[item.CategoryId] || "Unknown Category",
        categoryId: item.CategoryId, // Store the actual category ID for edits
        supplier: item.NamaSupplier || "No Supplier",
        stock: parseInt(item.Stok) || 0,
        price: parseInt(item.Harga) || 0,
        icon: CATEGORIES.EQUIPMENT.icon,
      }));

      console.log("Transformed items:", transformedItems);
      setItems(transformedItems);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseStock = async (itemId) => {
    try {
      await api.updateStock(itemId, "increase");
      fetchItems();
    } catch (err) {
      alert("Failed to increase stock: " + err.message);
    }
  };

  const handleDecreaseStock = async (itemId) => {
    try {
      await api.updateStock(itemId, "decrease");
      fetchItems();
    } catch (err) {
      alert("Failed to decrease stock: " + err.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.deleteItem(itemId);
        fetchItems();
      } catch (err) {
        alert("Failed to delete item: " + err.message);
      }
    }
  };

  const handleEdit = (item) => {
    console.log("Editing item:", item);
    setEditingItem({
      ...item,
      category: item.categoryId, // Use the categoryId for the edit form
    });
  };

  const handleSaveEdit = async (updatedItem) => {
    try {
      console.log("Saving edited item:", updatedItem);
      await api.updateItem(updatedItem.id, updatedItem);
      fetchItems();
      setEditingItem(null);
    } catch (err) {
      console.error("Failed to update item:", err);
      alert("Failed to update item: " + err.message);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      await api.addItem(newItem);
      fetchItems();
      setShowAddModal(false);
    } catch (err) {
      alert("Failed to add item: " + err.message);
    }
  };

  // Edit Modal Component with improved labels
  const EditModal = ({ item, onSave, onCancel }) => {
    const [editedItem, setEditedItem] = useState({ ...item });
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch categories when component mounts
    useEffect(() => {
      async function fetchCategories() {
        try {
          setIsLoading(true);
          const response = await fetch(`${API_BASE_URL}/category`);
          if (!response.ok) throw new Error("Failed to fetch categories");
          const data = await response.json();
          console.log("Categories for edit:", data);
          setCategories(data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          setIsLoading(false);
        }
      }

      fetchCategories();
    }, []);

    const handleSubmit = () => {
      console.log("Submitting edited item:", editedItem);
      onSave(editedItem);
    };

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Edit Item</h2>

          <div className="form-group">
            <label htmlFor="edit-name">
              <FaBoxes className="form-icon" /> Nama Produk
            </label>
            <input
              id="edit-name"
              value={editedItem.name}
              onChange={(e) =>
                setEditedItem({ ...editedItem, name: e.target.value })
              }
              placeholder="Masukkan nama produk"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-category">
              <FaTag className="form-icon" /> Kategori
            </label>
            <select
              id="edit-category"
              value={editedItem.category || ""}
              onChange={(e) =>
                setEditedItem({ ...editedItem, category: e.target.value })
              }
              className="category-select"
              disabled={isLoading}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.NamaKategori}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="edit-supplier">
              <FaTruck className="form-icon" /> Supplier
            </label>
            <input
              id="edit-supplier"
              value={editedItem.supplier || ""}
              onChange={(e) =>
                setEditedItem({ ...editedItem, supplier: e.target.value })
              }
              placeholder="Nama supplier"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-stock">
              <FaWarehouse className="form-icon" /> Stok Barang
            </label>
            <input
              id="edit-stock"
              type="number"
              value={editedItem.stock}
              onChange={(e) =>
                setEditedItem({ ...editedItem, stock: Number(e.target.value) })
              }
              placeholder="Jumlah stok"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-price">
              <FaTag className="form-icon" /> Harga (Rp)
            </label>
            <div className="price-input">
              <span className="price-prefix">Rp</span>
              <input
                id="edit-price"
                type="number"
                value={editedItem.price}
                onChange={(e) =>
                  setEditedItem({
                    ...editedItem,
                    price: Number(e.target.value),
                  })
                }
                placeholder="Harga per unit"
                min="0"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button onClick={handleSubmit}>Save</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  // Add Modal Component with improved labels
  const AddModal = ({ onAdd, onCancel }) => {
    const [newItem, setNewItem] = useState({
      name: "",
      category: "",
      supplier: "",
      stock: 0,
      price: 0,
      icon: null,
    });

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch categories when component mounts
    useEffect(() => {
      async function fetchCategories() {
        try {
          setIsLoading(true);
          const response = await fetch(`${API_BASE_URL}/category`);
          if (!response.ok) throw new Error("Failed to fetch categories");
          const data = await response.json();
          setCategories(data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          setIsLoading(false);
        }
      }

      fetchCategories();
    }, []);

    const handleSubmit = () => {
      if (!newItem.name) {
        alert("Product name is required");
        return;
      }
      if (!newItem.category) {
        alert("Category is required");
        return;
      }

      console.log("Adding new item:", newItem);
      onAdd(newItem);
    };

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Add New Item</h2>

          <div className="form-group">
            <label htmlFor="add-name">
              <FaBoxes className="form-icon" /> Nama Produk
            </label>
            <input
              id="add-name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Masukkan nama produk"
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-category">
              <FaTag className="form-icon" /> Kategori
            </label>
            <select
              id="add-category"
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
              className="category-select"
              disabled={isLoading}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.NamaKategori}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="add-supplier">
              <FaTruck className="form-icon" /> Supplier
            </label>
            <input
              id="add-supplier"
              value={newItem.supplier}
              onChange={(e) =>
                setNewItem({ ...newItem, supplier: e.target.value })
              }
              placeholder="Nama supplier"
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-stock">
              <FaWarehouse className="form-icon" /> Stok Barang
            </label>
            <input
              id="add-stock"
              type="number"
              value={newItem.stock}
              onChange={(e) =>
                setNewItem({ ...newItem, stock: Number(e.target.value) })
              }
              placeholder="Jumlah stok awal"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-price">
              <FaTag className="form-icon" /> Harga (Rp)
            </label>
            <div className="price-input">
              <span className="price-prefix">Rp</span>
              <input
                id="add-price"
                type="number"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: Number(e.target.value) })
                }
                placeholder="Harga per unit"
                min="0"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button onClick={handleSubmit}>Add</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="page-container">
        <Navbar />
        <main className="main-content">
          <div className="error-container">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={fetchItems}>Try Again</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Inventory Dashboard</h1>
            <p>Manage your inventory items, categories, and suppliers</p>
          </div>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            Add New Item
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="items-grid">
            {items.length === 0 ? (
              <p>No items found. Add a new item to get started.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-card-header">
                    {item.icon}
                    <h3>{item.name}</h3>
                    <div className="item-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="item-details">
                    <div className="detail-row">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">
                        {typeof item.category === "object"
                          ? "Unknown Category"
                          : item.category}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Supplier:</span>
                      <span className="detail-value">
                        {item.supplier || "No Supplier"}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Price:</span>
                      <span className="detail-value">Rp {item.price}</span>
                    </div>
                  </div>

                  <div className="stock-control">
                    <button
                      className="stock-btn decrease"
                      onClick={() => handleDecreaseStock(item.id)}
                    >
                      <FaMinus />
                    </button>
                    <div className="stock-display">
                      <span className="stock-label">Current Stock</span>
                      <span className="stock-count">{item.stock}</span>
                    </div>
                    <button
                      className="stock-btn increase"
                      onClick={() => handleIncreaseStock(item.id)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {editingItem && (
          <EditModal
            item={editingItem}
            onSave={handleSaveEdit}
            onCancel={() => setEditingItem(null)}
          />
        )}

        {showAddModal && (
          <AddModal
            onAdd={handleAddItem}
            onCancel={() => setShowAddModal(false)}
          />
        )}
      </main>
    </div>
  );
};

export default Home;

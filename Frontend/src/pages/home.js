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
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import "../assets/style/home.css";
import { api } from "../utils/api";

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
      const data = await api.getAllItems();
      // Transform MongoDB data structure to match our frontend
      const transformedItems = data.map((item) => ({
        id: item._id,
        name: item.NamaProduk,
        category: item.NamaKategori,
        supplier: item.NamaSupplier,
        stock: item.JumlahStok,
        price: item.HargaProduk,
        icon:
          CATEGORIES[
            Object.keys(CATEGORIES).find(
              (key) => CATEGORIES[key].name === item.NamaKategori
            )
          ]?.icon || CATEGORIES.EQUIPMENT.icon,
      }));
      setItems(transformedItems);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseStock = async (itemId) => {
    try {
      await api.updateStock(itemId, "increase");
      fetchItems();
    } catch (err) {
      alert("Failed to increase stock");
    }
  };

  const handleDecreaseStock = async (itemId) => {
    try {
      await api.updateStock(itemId, "decrease");
      fetchItems();
    } catch (err) {
      alert("Failed to decrease stock");
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.deleteItem(itemId);
        fetchItems();
      } catch (err) {
        alert("Failed to delete item");
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = async (updatedItem) => {
    try {
      await api.updateItem(updatedItem.id, updatedItem);
      fetchItems();
      setEditingItem(null);
    } catch (err) {
      alert("Failed to update item");
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      await api.addItem(newItem);
      fetchItems();
      setShowAddModal(false);
    } catch (err) {
      alert("Failed to add item");
    }
  };

  // Edit Modal Component
  const EditModal = ({ item, onSave, onCancel }) => {
    const [editedItem, setEditedItem] = useState(item);

    const handleCategoryChange = (e) => {
      const category = e.target.value;
      setEditedItem({
        ...editedItem,
        category,
        icon: CATEGORIES[
          Object.keys(CATEGORIES).find(
            (key) => CATEGORIES[key].name === category
          )
        ].icon,
      });
    };

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Edit Item</h2>
          <input
            value={editedItem.name}
            onChange={(e) =>
              setEditedItem({ ...editedItem, name: e.target.value })
            }
            placeholder="Name"
          />
          <select
            value={editedItem.category}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="">Select Category</option>
            {Object.values(CATEGORIES).map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            value={editedItem.supplier}
            onChange={(e) =>
              setEditedItem({ ...editedItem, supplier: e.target.value })
            }
            placeholder="Supplier"
          />
          {/* Add price field */}
          <input
            type="number"
            value={editedItem.price}
            onChange={(e) =>
              setEditedItem({ ...editedItem, price: Number(e.target.value) })
            }
            placeholder="Price"
          />
          <div className="modal-actions">
            <button onClick={() => onSave(editedItem)}>Save</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  // Add Modal Component
  const AddModal = ({ onAdd, onCancel }) => {
    const [newItem, setNewItem] = useState({
      name: "",
      category: "",
      supplier: "",
      stock: 0,
      price: 0,
      icon: null,
    });

    const handleCategoryChange = (e) => {
      const category = e.target.value;
      setNewItem({
        ...newItem,
        category,
        icon: CATEGORIES[
          Object.keys(CATEGORIES).find(
            (key) => CATEGORIES[key].name === category
          )
        ].icon,
      });
    };

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Add New Item</h2>
          <input
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Name"
          />
          <select
            value={newItem.category}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="">Select Category</option>
            {Object.values(CATEGORIES).map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            value={newItem.supplier}
            onChange={(e) =>
              setNewItem({ ...newItem, supplier: e.target.value })
            }
            placeholder="Supplier"
          />
          {/* Add price field */}
          <input
            type="number"
            value={newItem.price}
            onChange={(e) =>
              setNewItem({ ...newItem, price: Number(e.target.value) })
            }
            placeholder="Price"
          />
          <div className="modal-actions">
            <button onClick={() => onAdd(newItem)}>Add</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

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
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
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
                    <span className="detail-value">{item.category}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Supplier:</span>
                    <span className="detail-value">{item.supplier}</span>
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
            ))}
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

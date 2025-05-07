import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaBox } from "react-icons/fa";
import Navbar from "../components/Navbar";
import "../assets/style/page.css";

const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Food",
      description: "Food and beverage items",
      itemCount: 15,
    },
    // Add more sample categories as needed
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleSave = (category) => {
    if (editingCategory) {
      setCategories(
        categories.map((c) => (c.id === category.id ? category : c))
      );
    } else {
      setCategories([
        ...categories,
        { ...category, id: categories.length + 1, itemCount: 0 },
      ]);
    }
    setShowModal(false);
    setEditingCategory(null);
  };

  const CategoryModal = ({ onSave, onClose, category }) => {
    const [formData, setFormData] = useState(
      category || {
        name: "",
        description: "",
      }
    );

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>{category ? "Edit Category" : "Add New Category"}</h2>
          <input
            type="text"
            placeholder="Category Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <div className="modal-actions">
            <button onClick={() => onSave(formData)}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <div className="page-header">
          <h1>Categories</h1>
          <button onClick={() => setShowModal(true)} className="add-button">
            <FaPlus /> Add Category
          </button>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-header">
                <FaBox className="category-icon" />
                <h3>{category.name}</h3>
                <div className="category-actions">
                  <button
                    onClick={() => handleEdit(category)}
                    className="edit-button"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="delete-button"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="category-details">
                <p>{category.description}</p>
                <div className="item-count">{category.itemCount} items</div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <CategoryModal
            onSave={handleSave}
            onClose={() => {
              setShowModal(false);
              setEditingCategory(null);
            }}
            category={editingCategory}
          />
        )}
      </main>
    </div>
  );
};

export default Categories;

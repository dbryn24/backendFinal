import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaBox } from "react-icons/fa";
import Navbar from "../components/Navbar";
import "../assets/style/page.css";
import { API_BASE_URL } from "../utils/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching categories from:", `${API_BASE_URL}/category`);

      const response = await fetch(`${API_BASE_URL}/category`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Categories data received:", data);

      // Transform data to match component format
      const transformedCategories = data.map((category) => ({
        id: category._id,
        name: category.NamaKategori,
        description: category.description || "No description available",
        itemCount: category.itemCount || 0,
      }));

      setCategories(transformedCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Validate ID format before proceeding
    if (!isValidObjectId(id)) {
      setError("Invalid category ID format");
      return;
    }

    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        setError(null);
        console.log("Deleting category with ID:", id);

        const response = await fetch(`${API_BASE_URL}/category/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(result.message || "Failed to delete category");
        }

        alert("Category deleted successfully");
        fetchCategories();
      } catch (err) {
        console.error("Error deleting category:", err);
        setError(err.message);
      }
    }
  };

  const handleEdit = (category) => {
    // Validate ID format before proceeding
    if (!isValidObjectId(category.id)) {
      setError("Invalid category ID format");
      return;
    }

    console.log("Editing category:", category);
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleSave = async (category) => {
    try {
      setError(null);
      let response;

      // Prepare data for API
      const categoryData = {
        NamaKategori: category.name,
        description: category.description || "",
      };

      console.log("Saving category data:", categoryData);

      if (editingCategory) {
        // Validate ID format before proceeding
        if (!isValidObjectId(editingCategory.id)) {
          throw new Error("Invalid category ID format");
        }

        console.log("Updating category with ID:", editingCategory.id);

        // Update existing category
        response = await fetch(
          `${API_BASE_URL}/category/${editingCategory.id}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(categoryData),
          }
        );
      } else {
        // Create new category
        response = await fetch(`${API_BASE_URL}/category`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        });
      }

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message ||
            (editingCategory
              ? "Failed to update category"
              : "Failed to create category")
        );
      }

      // Refresh categories after save
      fetchCategories();
      setShowModal(false);
      setEditingCategory(null);
      alert(
        editingCategory
          ? "Category updated successfully"
          : "Category created successfully"
      );
    } catch (err) {
      console.error("Error saving category:", err);
      setError(err.message);
    }
  };

  // Helper function to validate MongoDB ObjectId format
  const isValidObjectId = (id) => {
    return id && /^[0-9a-fA-F]{24}$/.test(id);
  };

  const CategoryModal = ({ onSave, onClose, category }) => {
    const [formData, setFormData] = useState({
      name: category ? category.name : "",
      description: category
        ? category.description === "No description available"
          ? ""
          : category.description
        : "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>{category ? "Edit Category" : "Add New Category"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="categoryName">Category Name</label>
              <input
                id="categoryName"
                name="name"
                type="text"
                placeholder="Category Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoryDescription">Description</label>
              <textarea
                id="categoryDescription"
                name="description"
                placeholder="Enter category description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="modal-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="page-container">
        <Navbar />
        <main className="main-content">
          <p>Loading categories...</p>
        </main>
      </div>
    );
  }

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

        {error && (
          <div className="error-container">
            <h2>Error</h2>
            <p>{error}</p>
            <div className="error-actions">
              <button onClick={() => setError(null)}>Dismiss</button>
              <button onClick={fetchCategories}>Try Again</button>
            </div>
          </div>
        )}

        <div className="categories-grid">
          {categories.length === 0 ? (
            <p>No categories found. Add a new category to get started.</p>
          ) : (
            categories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-header">
                  <FaBox className="category-icon" />
                  <h3>{category.name}</h3>
                  <div className="category-actions">
                    <button
                      onClick={() => handleEdit(category)}
                      className="edit-button"
                      title={`Edit ${category.name}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="delete-button"
                      title={`Delete ${category.name}`}
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
            ))
          )}
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

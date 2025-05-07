import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Navbar from "../components/Navbar";
import "../assets/style/page.css";

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Rice",
      price: 25000,
      category: "Food",
      description: "Premium quality rice",
    },
    // Add more sample products as needed
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleSave = (product) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts([...products, { ...product, id: products.length + 1 }]);
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const ProductModal = ({ onSave, onClose, product }) => {
    const [formData, setFormData] = useState(
      product || {
        name: "",
        price: "",
        category: "",
        description: "",
      }
    );

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>{product ? "Edit Product" : "Add New Product"}</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
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
          <h1>Products</h1>
          <button onClick={() => setShowModal(true)} className="add-button">
            <FaPlus /> Add Product
          </button>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <h3>{product.name}</h3>
                <div className="product-actions">
                  <button
                    onClick={() => handleEdit(product)}
                    className="edit-button"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="delete-button"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="product-details">
                <p>Price: Rp {product.price}</p>
                <p>Category: {product.category}</p>
                <p>{product.description}</p>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <ProductModal
            onSave={handleSave}
            onClose={() => {
              setShowModal(false);
              setEditingProduct(null);
            }}
            product={editingProduct}
          />
        )}
      </main>
    </div>
  );
};

export default Products;

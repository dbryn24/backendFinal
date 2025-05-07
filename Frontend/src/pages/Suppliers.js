import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaPhone, FaEnvelope } from "react-icons/fa";
import Navbar from "../components/Navbar";
import "../assets/style/page.css";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Food Supplier Co",
      contact: "John Doe",
      phone: "123-456-7890",
      email: "john@foodsupplier.com",
      address: "123 Food St, Kitchen City",
    },
    // Add more sample suppliers as needed
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
    }
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setShowModal(true);
  };

  const handleSave = (supplier) => {
    if (editingSupplier) {
      setSuppliers(suppliers.map((s) => (s.id === supplier.id ? supplier : s)));
    } else {
      setSuppliers([...suppliers, { ...supplier, id: suppliers.length + 1 }]);
    }
    setShowModal(false);
    setEditingSupplier(null);
  };

  const SupplierModal = ({ onSave, onClose, supplier }) => {
    const [formData, setFormData] = useState(
      supplier || {
        name: "",
        contact: "",
        phone: "",
        email: "",
        address: "",
      }
    );

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>{supplier ? "Edit Supplier" : "Add New Supplier"}</h2>
          <input
            type="text"
            placeholder="Supplier Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contact Person"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <textarea
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
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
          <h1>Suppliers</h1>
          <button onClick={() => setShowModal(true)} className="add-button">
            <FaPlus /> Add Supplier
          </button>
        </div>

        <div className="suppliers-grid">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="supplier-card">
              <div className="supplier-header">
                <h3>{supplier.name}</h3>
                <div className="supplier-actions">
                  <button
                    onClick={() => handleEdit(supplier)}
                    className="edit-button"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(supplier.id)}
                    className="delete-button"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="supplier-details">
                <p>
                  <strong>Contact:</strong> {supplier.contact}
                </p>
                <p>
                  <FaPhone /> {supplier.phone}
                </p>
                <p>
                  <FaEnvelope /> {supplier.email}
                </p>
                <p>
                  <strong>Address:</strong> {supplier.address}
                </p>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <SupplierModal
            onSave={handleSave}
            onClose={() => {
              setShowModal(false);
              setEditingSupplier(null);
            }}
            supplier={editingSupplier}
          />
        )}
      </main>
    </div>
  );
};

export default Suppliers;

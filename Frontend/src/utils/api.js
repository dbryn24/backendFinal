const API_BASE_URL = "http://localhost:5000/api";

export const api = {
  getAllItems: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch items");
    return response.json();
  },

  addItem: async (itemData) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        NamaProduk: itemData.name,
        NamaKategori: itemData.category,
        NamaSupplier: itemData.supplier,
        JumlahStok: itemData.stock,
        HargaProduk: itemData.price || 0,
      }),
    });
    if (!response.ok) throw new Error("Failed to add item");
    return response.json();
  },

  updateItem: async (id, itemData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        NamaProduk: itemData.name,
        NamaKategori: itemData.category,
        NamaSupplier: itemData.supplier,
        JumlahStok: itemData.stock,
        HargaProduk: itemData.price || 0,
      }),
    });
    if (!response.ok) throw new Error("Failed to update item");
    return response.json();
  },

  deleteItem: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete item");
    return response.json();
  },

  updateStock: async (id, action) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}/stock`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    });
    if (!response.ok) throw new Error("Failed to update stock");
    return response.json();
  },
};

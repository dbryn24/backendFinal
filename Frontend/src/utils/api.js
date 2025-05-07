// Export API_BASE_URL at the top
export const API_BASE_URL = "http://localhost:5000/api";

export const api = {
  getAllItems: async () => {
    try {
      console.log("Fetching products from:", `${API_BASE_URL}/products`);
      const response = await fetch(`${API_BASE_URL}/products`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API Error Details:", error);
      throw new Error("Failed to fetch items. Please try again.");
    }
  },

  getAllCategories: async () => {
    try {
      console.log("Fetching categories from:", `${API_BASE_URL}/category`);
      const response = await fetch(`${API_BASE_URL}/category`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API Error:", error);
      return []; // Return empty array as fallback
    }
  },

  addItem: async (itemData) => {
    try {
      console.log("Sending data to create item:", itemData);
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NamaProduct: itemData.name,
          CategoryId: itemData.category,
          NamaSupplier: itemData.supplier, // Explicitly include supplier field
          Harga: parseInt(itemData.price) || 0,
          Stok: parseInt(itemData.stock) || 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error(errorData.message || "Failed to add item");
      }

      return response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw new Error("Failed to add item. Please try again: " + error.message);
    }
  },

  updateItem: async (id, itemData) => {
    try {
      console.log("Sending data to update item:", id, itemData);

      // Create the request body with proper field mapping
      const requestBody = {
        NamaProduct: itemData.name,
        CategoryId: itemData.category,
        NamaSupplier: itemData.supplier, // Send as NamaSupplier for backend
        supplier: itemData.supplier, // Also send as supplier for compatibility
        Harga: parseInt(itemData.price) || 0,
        Stok: parseInt(itemData.stock) || 0,
      };

      console.log("Update request body:", requestBody);

      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        let errorMessage = "Failed to update item";
        try {
          const errorData = await response.json();
          console.error("Server error response:", errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, get text instead
          const errorText = await response.text();
          console.error("Server error text:", errorText);
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw new Error(
        "Failed to update item. Please try again: " + error.message
      );
    }
  },

  deleteItem: async (id) => {
    try {
      console.log("Deleting item:", id);
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(errorText || "Failed to delete item");
      }

      return response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw new Error(
        "Failed to delete item. Please try again: " + error.message
      );
    }
  },

  updateStock: async (id, action) => {
    try {
      console.log("Updating stock for item:", id, "Action:", action);
      const response = await fetch(`${API_BASE_URL}/products/${id}/stock`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(errorText || "Failed to update stock");
      }

      return response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw new Error(
        "Failed to update stock. Please try again: " + error.message
      );
    }
  },
};

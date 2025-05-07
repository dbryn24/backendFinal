// Frontend authentication utilities

// Get user from localStorage
export const getUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return getToken() !== null;
};

// Check if user has specific role
export const hasRole = (role) => {
  const user = getUser();
  return user && user.role === role;
};

// Logout (clear localStorage)
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // Force page reload to clear any in-memory states
  window.location.href = "/login";
};

// Get authenticated fetch headers (with token)
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    "x-auth-token": token || "",
  };
};

// Authenticated fetch wrapper
export const authFetch = async (url, options = {}) => {
  const headers = {
    ...options.headers,
    ...getAuthHeaders(),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized (token expired or invalid)
  if (response.status === 401) {
    logout();
    return null;
  }

  return response;
};

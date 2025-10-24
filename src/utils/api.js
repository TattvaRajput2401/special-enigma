// 🌐 API Configuration
// Automatically uses correct API URL based on environment

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const apiUrl = (path) => {
  // In development, use proxy (just /api/...)
  if (import.meta.env.DEV) {
    return path
  }
  // In production, use full backend URL
  return `${API_BASE_URL}${path}`
}

export default API_BASE_URL

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// 📖 EXPLANATION: This component protects routes from unauthenticated users
// If user is logged in → show the page
// If not logged in → redirect to login page

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />
  }

  // Show the protected page if authenticated
  return children
}

export default ProtectedRoute

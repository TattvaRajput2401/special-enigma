import { createContext, useContext, useState, useEffect } from 'react'

// 📖 EXPLANATION: Context API lets us share state across components without prop drilling
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔄 Check localStorage for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // 📥 LOGIN: Save user to state and localStorage
  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // 🚪 LOGOUT: Clear user from state and localStorage
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  // 📦 SIGNUP: Same as login for now (mock)
  const signup = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // 📤 Provide these values to all children components
  const value = {
    user,
    login,
    logout,
    signup,
    isAuthenticated: !!user // true if user exists
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 🪝 Custom hook to use auth context easily
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import './Dashboard.css'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showTaskForm, setShowTaskForm] = useState(false)

  // 🔄 Fetch tasks on mount
  useEffect(() => {
    fetchTasks()
  }, [])

  // 📥 FETCH: Get all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tasks')
      if (!response.ok) throw new Error('Failed to fetch tasks')
      const data = await response.json()
      setTasks(data)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  // ➕ ADD TASK: Callback function passed to TaskForm
  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask])
    setShowTaskForm(false)
  }

  // 🚪 LOGOUT
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // 📊 CALCULATE STATISTICS
  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    highPriority: tasks.filter(t => t.priority === 'high').length
  }

  return (
    <div className="dashboard">
      {/* 🎨 SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>📚 Study Tracker</h2>
        </div>

        <div className="user-info">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="user-details">
            <p className="user-name">{user?.name || 'User'}</p>
            <p className="user-email">{user?.email || ''}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            📊 Dashboard
          </button>
          <button className="nav-item" onClick={() => setShowTaskForm(true)}>
            ➕ New Task
          </button>
        </nav>

        <button onClick={handleLogout} className="logout-btn">
          🚪 Logout
        </button>
      </aside>

      {/* 📄 MAIN CONTENT */}
      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name}! 👋</h1>
            <p>Here's your study overview</p>
          </div>
        </header>

        {/* 📊 STATISTICS CARDS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <p className="stat-label">Total Tasks</p>
              <p className="stat-value">{stats.total}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <p className="stat-label">To Do</p>
              <p className="stat-value">{stats.todo}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <p className="stat-label">In Progress</p>
              <p className="stat-value">{stats.inProgress}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <p className="stat-label">Completed</p>
              <p className="stat-value">{stats.done}</p>
            </div>
          </div>
        </div>

        {/* ➕ TASK FORM MODAL */}
        {showTaskForm && (
          <div className="modal-overlay" onClick={() => setShowTaskForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <TaskForm 
                onTaskAdded={handleTaskAdded} 
                onCancel={() => setShowTaskForm(false)}
              />
            </div>
          </div>
        )}

        {/* 📋 TASKS LIST */}
        <div className="tasks-section">
          <div className="section-header">
            <h2>Your Tasks</h2>
            <button 
              onClick={() => setShowTaskForm(true)} 
              className="btn btn-primary"
            >
              ➕ Add Task
            </button>
          </div>

          {loading && <p>Loading tasks...</p>}
          {error && <p className="error">Error: {error}</p>}
          {!loading && !error && (
            <TaskList tasks={tasks} onTasksChange={fetchTasks} />
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard

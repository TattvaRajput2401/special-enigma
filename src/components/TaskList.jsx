import { useState } from 'react'
import './TaskList.css'

const TaskList = ({ tasks, onTasksChange }) => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // 🔍 FILTER TASKS
  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filter !== 'all' && task.status !== filter) {
      return false
    }
    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      return (
        task.title.toLowerCase().includes(search) ||
        task.subject.toLowerCase().includes(search)
      )
    }
    return true
  })

  // 🗑️ DELETE TASK
  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      // 📖 EXPLANATION: Send DELETE request to backend
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete task')
      }

      // ✅ SUCCESS: Refresh task list
      onTasksChange()
    } catch (err) {
      console.error('Error deleting task:', err)
      alert('Failed to delete task. Please try again.')
    }
  }

  // ✏️ UPDATE STATUS
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // 📖 EXPLANATION: Send PATCH request to update task status
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) {
        throw new Error('Failed to update task')
      }

      // ✅ SUCCESS: Refresh task list
      onTasksChange()
    } catch (err) {
      console.error('Error updating task:', err)
      alert('Failed to update task. Please try again.')
    }
  }

  return (
    <div className="task-list">
      {/* 🔍 FILTERS AND SEARCH */}
      <div className="task-controls">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button
            className={`filter-btn ${filter === 'todo' ? 'active' : ''}`}
            onClick={() => setFilter('todo')}
          >
            To Do ({tasks.filter(t => t.status === 'todo').length})
          </button>
          <button
            className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setFilter('in-progress')}
          >
            In Progress ({tasks.filter(t => t.status === 'in-progress').length})
          </button>
          <button
            className={`filter-btn ${filter === 'done' ? 'active' : ''}`}
            onClick={() => setFilter('done')}
          >
            Done ({tasks.filter(t => t.status === 'done').length})
          </button>
        </div>

        <input
          type="text"
          placeholder="🔍 Search tasks..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 📋 TASKS */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>📭 No tasks found</p>
          {searchTerm && <p>Try adjusting your search</p>}
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map((task) => (
            <div key={task.id} className={`task-card status-${task.status}`}>
              {/* TASK HEADER */}
              <div className="task-card-header">
                <h3 className="task-title">{task.title}</h3>
                <span className={`priority-badge priority-${task.priority}`}>
                  {task.priority === 'high' && '🔴'}
                  {task.priority === 'med' && '🟡'}
                  {task.priority === 'low' && '🟢'}
                  {task.priority.toUpperCase()}
                </span>
              </div>

              {/* TASK DETAILS */}
              {task.subject && (
                <p className="task-subject">📖 {task.subject}</p>
              )}

              {task.dueAt && (
                <p className="task-due">
                  📅 Due: {new Date(task.dueAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              )}

              <p className="task-created">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </p>

              {/* STATUS BADGE */}
              <div className="task-status-badge">
                {task.status === 'todo' && '⏳ To Do'}
                {task.status === 'in-progress' && '🔄 In Progress'}
                {task.status === 'done' && '✅ Done'}
              </div>

              {/* ACTIONS */}
              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="status-select"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="delete-btn"
                  title="Delete task"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList

import { useState } from 'react'
import './TaskForm.css'

const TaskForm = ({ onTaskAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    priority: 'med',
    dueAt: ''
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // 📝 HANDLE INPUT CHANGES
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // 📤 SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.title.trim()) {
      setError('Task title is required')
      return
    }

    try {
      setSubmitting(true)

      // 📖 EXPLANATION: Send POST request to create task
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          subject: formData.subject.trim(),
          priority: formData.priority,
          dueAt: formData.dueAt || null
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create task')
      }

      const newTask = await response.json()
      
      // 🎉 SUCCESS: Call parent callback
      onTaskAdded(newTask)
      
      // Reset form
      setFormData({
        title: '',
        subject: '',
        priority: 'med',
        dueAt: ''
      })
    } catch (err) {
      setError(err.message)
      console.error('Error creating task:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="task-form">
      <h2>➕ Create New Task</h2>
      
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        {/* 📝 TITLE */}
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Complete Chapter 5 exercises"
            required
          />
        </div>

        {/* 📚 SUBJECT */}
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g., Mathematics, DSA, Physics"
          />
        </div>

        {/* 🎯 PRIORITY */}
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">🟢 Low</option>
            <option value="med">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        {/* 📅 DUE DATE */}
        <div className="form-group">
          <label htmlFor="dueAt">Due Date</label>
          <input
            type="date"
            id="dueAt"
            name="dueAt"
            value={formData.dueAt}
            onChange={handleChange}
          />
        </div>

        {/* 🔘 BUTTONS */}
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm

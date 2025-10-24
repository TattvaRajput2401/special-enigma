import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Home.css'

const Home = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="home-page">
      {/* 🎯 HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            📚 Study Tracker
          </h1>
          <p className="hero-subtitle">
            Organize your studies, track your progress, and achieve your goals
          </p>
          <p className="hero-description">
            The smart way to manage your study tasks, assignments, and deadlines all in one place.
          </p>
          
          <div className="hero-cta">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ✨ FEATURES SECTION */}
      <section className="features">
        <h2 className="features-title">Why Study Tracker?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Task Management</h3>
            <p>Create and organize study tasks with priorities and due dates</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>Monitor your study progress and completion rates</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Subject Organization</h3>
            <p>Categorize tasks by subject for better focus</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⏰</div>
            <h3>Deadline Reminders</h3>
            <p>Never miss a deadline with smart reminders</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Analytics</h3>
            <p>Get insights into your study habits and productivity</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful UI</h3>
            <p>Clean, intuitive interface for distraction-free studying</p>
          </div>
        </div>
      </section>

      {/* 📞 CTA SECTION */}
      <section className="cta-section">
        <h2>Ready to boost your productivity?</h2>
        <p>Join students who are already achieving more with Study Tracker</p>
        {!isAuthenticated && (
          <Link to="/signup" className="btn btn-primary btn-large">
            Start Tracking Now →
          </Link>
        )}
      </section>

      {/* 🦶 FOOTER */}
      <footer className="footer">
        <p>© 2025 Study Tracker. Built with ❤️ for students.</p>
      </footer>
    </div>
  )
}

export default Home

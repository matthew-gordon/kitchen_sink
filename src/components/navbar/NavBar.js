import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ appName, currentUser }) => (
  // eslint-disable-next-line
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <section className="container">
      <div className="navbar-brand">
        <strong className="navbar-item">{appName}</strong>
        <span
          className="nav-toggle navbar-burger"
          onClick={() => {
            let toggle = document.querySelector('.nav-toggle')
            let menu = document.querySelector('.navbar-menu')
            toggle.classList.toggle('is-active')
            menu.classList.toggle('is-active')
          }}
        >
          <span />
          <span />
          <span />
        </span>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>
        </div>
        <div className="navbar-end">
          {!currentUser && (
            <div className="navbar-item">
              <Link to="/register" className="button is-primary">
                Register
              </Link>
              &nbsp;
              <Link to="/login" className="button is-link">
                Log In
              </Link>
            </div>
          )}
          {currentUser && <div className="navbar-item">{currentUser.username}</div>}
        </div>
      </div>
    </section>
  </nav>
)

export default NavBar

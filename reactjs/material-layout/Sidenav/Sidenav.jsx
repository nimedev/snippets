/**
 * @module Sidenav
 */

// Dependencies
import React, { PropTypes } from 'react'
import './Sidenav.css'

const Sidenav = ({ className, isVisible, toggleSidenav }) => {
  const visibleClass = isVisible ? 'is-visible' : ''
  return (
    <aside className={`Sidenav ${className} ${visibleClass}`}>
      <div className="Sidenav-back"
        onClick={toggleSidenav} />

      <div className="Sidenav-wrapper">
        <div className="Sidenav-header">
          <a className="Sidenav-logo"
            title="Logo">
            <img src="/assets/img/logo.png"
              alt="logo" />
          </a>
        </div>

        <div className="Divider" />

        <div className="Sidenav-content">
          Sidenav
      </div>
      </div>
    </aside>
  )
}

Sidenav.propTypes = {
  className: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  toggleSidenav: PropTypes.func.isRequired
}

/**
 * Sidenav component
 */
export default Sidenav
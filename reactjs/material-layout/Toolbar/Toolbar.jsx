/**
 * @module Toolbar
 */

// Dependencies
import React, { PropTypes } from 'react'
import './Toolbar.css'

const Toolbar = ({ className, toggleSidenav }) => (
  <header className={`Toolbar ${className}`}>
    {/* Sidenav toggle button */}
    <div className="Toolbar-item IconButton MaterialIcon is-md-hidden"
      onClick={toggleSidenav}>menu</div>
  </header>
)

Toolbar.propTypes = {
  className: PropTypes.string,
  toggleSidenav: PropTypes.func.isRequired
}

/**
 * Toolbar component
 */
export default Toolbar
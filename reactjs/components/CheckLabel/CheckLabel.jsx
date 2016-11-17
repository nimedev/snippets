/**
 * @module CheckLabel
 */

// Dependencies
import React, { PropTypes } from 'react'
import './CheckLabel.css'

const CheckLabel = ({ id, children, checkLabelRef, ...props }) => (
  <div className="CheckLabel">
    <input id={id}
      type="checkbox"
      onChange={props.onChange}
      ref={checkLabelRef}
      {...props} />
    <label className="CheckLabel-icon MaterialIcon"
      htmlFor={id} />
    <label className="CheckLabel-label"
      htmlFor={id}>{children}</label>
  </div>
)

CheckLabel.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checkLabelRef: PropTypes.func
}

/**
 * CheckLabel component
 */
export default CheckLabel
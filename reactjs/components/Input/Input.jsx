/**
 * Only show invalid messages and icon after change and leave the element the
 * first time.
 * Hide the custom error messages after change the input.
 * To pass validation messages see 'Data form validation' in MDN.
 * @module Input
 */

// Dependencies
import React, { Component, PropTypes } from 'react'
import './Input.css'


class Input extends Component {
  static get propTypes() {
    return {
      description: PropTypes.object,
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      onChange: PropTypes.func
    }
  }

  constructor(...args) {
    super(...args)
    this.state = {
      hasChanged: false,
      loseFocus: false
    }
    this.inputRef = this.inputRef.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  /**
   * Set a reference to input in component object.
   */
  inputRef(input) {
    this.input = input
  }

  /**
   * Set loseFocus state if input onBlur
   */
  handleBlur() {
    this.setState({ loseFocus: true })
  }

  /**
   * Set hasChanged state if input change
   */
  handleChange(ev, onChange) {
    this.setState({
      hasChanged: true
    })
    onChange && onChange(ev)
  }

  render() {
    const { description, id, label, onChange, ...props } = this.props
    const { hasChanged, loseFocus } = this.state
    const customError = description.customError
    let validateClass = hasChanged && loseFocus ? 'Input--validate' : ''
    validateClass += `${customError ? ' Input--customError' : ''}`
    const validity = this.input ? this.input.validity : {}
    return (
      <div className="Input">
        {label && <label htmlFor={id}>{label}</label>}
        <input className={validateClass}
          id={id}
          onBlur={this.handleBlur}
          onChange={ev => this.handleChange(ev, onChange)}
          ref={this.inputRef}
          {...props} />
        <span className="Input-valIcon" />
        <div className="Input-description">
          {/* Show validation error according with validity object */}
          {validateClass && (
            (validity.patternMismatch && description.patternMismatch && <div>{description.patternMismatch}</div>)
            || (validity.rangeOverflow && description.rangeOverflow && <div>{description.rangeOverflow}</div>)
            || (validity.rangeUnderflow && description.rangeUnderflow && <div>{description.rangeUnderflow}</div>)
            || (validity.stepMismatch && description.stepMismatch && <div>{description.stepMismatch}</div>)
            || (validity.tooLong && description.tooLong && <div>{description.tooLong}</div>)
            || (validity.typeMismatch && description.typeMismatch && <div>{description.typeMismatch}</div>)
            || (validity.valueMissing && description.valueMissing && <div>{description.valueMissing}</div>))}
          {/* Show custom error */}
          {customError && <div>{customError}</div>}
        </div>
      </div>
    )
  }
}

/**
 * Input component
 */
export default Input
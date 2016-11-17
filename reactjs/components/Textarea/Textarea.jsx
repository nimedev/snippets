/**
 * @module Textarea
 */

import React, { Component, PropTypes } from 'react'
import ErrorDescription from '../ErrorDescription'
import './Textarea.css'

class Textarea extends Component {

  static get propTypes() {
    return {
      customError: PropTypes.any,
      description: PropTypes.object,
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      onUpdate: PropTypes.func,
      value: PropTypes.any.isRequired
    }
  }

  constructor(...args) {
    super(...args)
    super(...args)
    this.state = {
      hasChanged: false,
      loseFocus: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { customError, onUpdate } = nextProps
    const error = customError ? customError.message : ''
    this.textarea.setCustomValidity(error)
    onUpdate && onUpdate(this.textarea)
  }

  /**
   * Set loseFocus state if textarea onBlur
   */
  handleBlur() {
    this.setState({ loseFocus: true })
  }

  /**
   * Set hasChanged state if textarea change
   */
  handleChange(ev) {
    const { onChange } = this.props
    this.setState({ hasChanged: true })
    onChange(ev)
  }

  renderDescription(validity, description, errorName) {
    const message = description[errorName]
    return validity[errorName] && message ? <div>{message}</div> : null
  }

  render() {
    const { customError, description, id, label, ...props } = this.props
    const { hasChanged, loseFocus } = this.state
    const validity = this.textarea ? this.textarea.validity : {}
    const showDescription = (hasChanged && loseFocus)
    const validateClass = showDescription || customError
      ? 'Textarea--validate' : ''
    const updatedClass = hasChanged ? 'Textarea--updated' : ''

    // Delete properties to avoid pass in spread operation
    delete props.onChange
    delete props.onUpdate

    return (
      <div className="Textarea">
        {label && <label htmlFor={id}>{label}</label>}
        <textarea className={`${validateClass} ${updatedClass}`}
          id={id}
          onBlur={this.handleBlur}
          onChange={ev => this.handleChange(ev)}
          ref={textarea => this.textarea = textarea}
          required={!!description.valueMissing}
          {...props} />
        <ErrorDescription description={description}
          showDescription={showDescription}
          validity={validity} />
      </div>
    )
  }
}

/**
 * Textarea component
 */
export default Textarea
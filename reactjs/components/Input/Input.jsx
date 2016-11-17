/**
 * Only show invalid messages and icon after change and leave the element the
 * first time.
 * To pass validation messages see 'Data form validation' in MDN.
 * Use onChange to change the value passed throw props.
 * Use onUpdate to know when input will be updated. You can use to indicate
 * when check form validation.
 * @module Input
 */

import React, { Component, PropTypes } from 'react'
import CheckLabel from '../CheckLabel'
import ErrorDescription from '../ErrorDescription'
import './Input.css'

class Input extends Component {

  static get propTypes() {
    return {
      customError: PropTypes.any,
      description: PropTypes.object,
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      onUpdate: PropTypes.func,
      type: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired
    }
  }

  constructor(...args) {
    super(...args)
    const { type } = this.props
    this.state = {
      hasChanged: false,
      loseFocus: type === 'checkbox'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { customError, onUpdate } = nextProps
    const error = customError ? customError.message : ''
    this.input.setCustomValidity(error)
    onUpdate && onUpdate(this.input)
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
  handleChange(ev) {
    this.setState({ hasChanged: true })
    this.props.onChange(ev)
  }

  render() {
    const { customError, description, label, ...props } = this.props
    const { hasChanged, loseFocus } = this.state
    const validity = this.input ? this.input.validity : {}
    const showDescription = (hasChanged && loseFocus)
    const validateClass = showDescription || customError
      ? 'Input--validate' : ''
    const updatedClass = hasChanged ? 'Input--updated' : ''
    const isCheckbox = props.type === 'checkbox'

    // Delete properties to avoid pass in spread operation
    delete props.onChange
    delete props.onUpdate
    isCheckbox && delete props.value

    return (
      <div className="Input">
        {!isCheckbox && label && <label htmlFor={props.id}>{label}</label>}
        {!isCheckbox
          && <input className={`Input-input ${validateClass} ${updatedClass}`}
            onBlur={this.handleBlur}
            onChange={ev => this.handleChange(ev)}
            ref={input => this.input = input}
            required={!!description.valueMissing}
            {...props} />}
        {!isCheckbox && <span className="Input-valIcon" />}
        {isCheckbox
          && <CheckLabel checked={props.value}
            onBlur={this.handleBlur}
            onChange={ev => this.handleChange(ev)}
            checkLabelRef={input => this.input = input}
            required={!!description.valueMissing}
            {...props}>{label}</CheckLabel>}
        <ErrorDescription description={description}
          showDescription={showDescription}
          validity={validity} />
      </div>
    )
  }
}

/**
 * Input component
 */
export default Input
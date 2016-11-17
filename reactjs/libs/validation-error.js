/**
 * Functions used to handle validation errors from API.
 * @module validation-error
 */

import i18n from 'i18next'

/**
 * @return {Object} the 'ValidationError' object of a field
 */
export const validationError = (error, field) => {
  const errors = error && error.name === 'ValidationError'
    ? error.errors : null
  return errors ? errors[field] : null
}

/**
 * @returns custom error of a field
 */
export const validationErrorMessage = (error, field) => {
  const fieldError = validationError(error, field)
  return fieldError
    ? i18n.t(`ERRORS.${field}.${fieldError.kind}`)
    : undefined
}

/**
 * @param {Object} input - a object with information to create a Input.
 * @param {string} ns - namespace of the input errors.
 * @param {Object} error - error used to get error validation messages.
 * @returns {Object} descriptions for input element
 */
export const getDescriptions = (input, ns, error) => {
  const descriptions = {
    customError: validationErrorMessage(error, input.name)
  }
  if (!input.descriptions) {
    return descriptions
  }
  for (let description of input.descriptions) {
    const msgNamespace = `${ns}.${input.name}.${description}`
    descriptions[description] = i18n.t(msgNamespace)
  }
  return descriptions
}

/**
 * Remove validation error of a field from a error object.
 * @returns {Object} new error object. return null if oldError is not a
 * 'ValidationError' or if errors field don't have fields.
 */
export const clearValidationError = (oldError, field) => {
  let newError = null
  if (field && oldError && oldError.errors) {
    newError = { ...oldError }
    delete newError.errors[field]
    if (Object.keys(newError.errors).length === 0) {
      newError = null
    }
  }
  return newError
}
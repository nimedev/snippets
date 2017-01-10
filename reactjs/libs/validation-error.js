/**
 * Functions used to handle validation errors from API.
 * @module validation-error
 */

/**
 * @param {Object} error - Error object to extract a validation error.
 * @param {String} field - the name of field to check if have a ValidationError.
 * @return {Object} the 'ValidationError' object of a field
 */
const validationError = (error, field) => {
  const errors = error && error.name === 'ValidationError' ?
    error.errors : null
  return errors ? errors[field] : null
}

/**
 * @param {Object} error - Error object to extract a validation error.
 * @param {String} field - the name of field to check if have a ValidationError.
 * @return {String} the kind property of 'ValidationError' object for a field
 */
export const getValidationKind = (error, field) => {
  const validationErr = validationError(error, field)
  return validationErr ? validationErr.kind : null
}

export default validationError

/**
 * @module ErrorDescription
 */

import React, { PropTypes } from 'react'
import './ErrorDescription.css'

const showError = (validity, description, errorName) => {
  return validity[errorName] && description[errorName]
}

const ErrorDescription = ({ description, showDescription, validity }) => (
  <div className="ErrorDescription">
    {/* Show validation error according with validity object */}
    {showDescription && (
      showError(validity, description, 'patternMismatch') && <div>{description.patternMismatch}</div>
      || showError(validity, description, 'rangeOverflow') && <div>{description.rangeOverflow}</div>
      || showError(validity, description, 'rangeUnderflow') && <div>{description.rangeUnderflow}</div>
      || showError(validity, description, 'stepMismatch') && <div>{description.stepMismatch}</div>
      || showError(validity, description, 'tooLong') && <div>{description.tooLong}</div>
      || showError(validity, description, 'typeMismatch') && <div>{description.typeMismatch}</div>
      || showError(validity, description, 'valueMissing') && <div>{description.valueMissing}</div>
    )}
    {description.customError && <div>{description.customError}</div>}
  </div>
)

ErrorDescription.propTypes = {
  description: PropTypes.object,
  showDescription: PropTypes.bool.isRequired,
  validity: PropTypes.object
}

/**
 * ErrorDescription component
 */
export default ErrorDescription
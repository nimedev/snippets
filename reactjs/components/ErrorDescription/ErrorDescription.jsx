/**
 * @module ErrorDescription
 */

import React, { PropTypes } from 'react'
import './ErrorDescription.css'

const showError = (validity, descriptions, errorName) => (
  validity[errorName] && descriptions[errorName]
)

const ErrorDescription = ({ customErrorMsg, descriptions, showDescription, validity }) => (
  <div className="ErrorDescription">
    {/* Show validation error according with validity object */}
    {showDescription && (
      (showError(validity, descriptions, 'patternMismatch') && <div>{descriptions.patternMismatch}</div>)
      || (showError(validity, descriptions, 'rangeOverflow') && <div>{descriptions.rangeOverflow}</div>)
      || (showError(validity, descriptions, 'rangeUnderflow') && <div>{descriptions.rangeUnderflow}</div>)
      || (showError(validity, descriptions, 'stepMismatch') && <div>{descriptions.stepMismatch}</div>)
      || (showError(validity, descriptions, 'tooLong') && <div>{descriptions.tooLong}</div>)
      || (showError(validity, descriptions, 'typeMismatch') && <div>{descriptions.typeMismatch}</div>)
      || (showError(validity, descriptions, 'valueMissing') && <div>{descriptions.valueMissing}</div>)
    )}
    {(validity.customError && customErrorMsg && <div>{customErrorMsg}</div>)}
  </div>
)

ErrorDescription.propTypes = {
  customErrorMsg: PropTypes.string,
  descriptions: PropTypes.object,
  showDescription: PropTypes.bool.isRequired,
  validity: PropTypes.object.isRequired
}

ErrorDescription.defaultProps = {
  customErrorMsg: null,
  descriptions: null
}

/**
 * ErrorDescription component
 */
export default ErrorDescription

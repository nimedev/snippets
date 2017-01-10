/**
 * Module fot input components
 * @module inputs.module
 */

import inputComponent from './input'
import inputDateComponent from './input-date'
import selectComponent from './select'

/**
 * Module name
 */
export default angular
  .module('inputs', [])
  .component('nmdInput', inputComponent)
  .component('nmdInputDate', inputDateComponent)
  .component('nmdSelect', selectComponent)
  .name
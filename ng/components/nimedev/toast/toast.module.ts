/**
 * Module for toast component.
 * @module toast.module
 */

import toastComponent from './toast.component'
import ToastService from './toast.service'

/**
 * Module name
 */
export default angular
  .module('toast', [])
  .component('nmdToast', toastComponent)
  .service('toastService', ToastService)
  .name
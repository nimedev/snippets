/**
 * Module for dialog component.
 * @module dialog.module
 */

import dialogComponent from './dialog.component'
import DialogService from './dialog.service'
import DialogListenersService from './dialog-listeners.service'

/**
 * Module name
 */
export default angular
  .module('dialog', [])
  .component('nmdDialog', dialogComponent)
  .service('dialogService', DialogService)
  .service('dialogListenersService', DialogListenersService)
  .name
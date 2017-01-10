/**
 * Group nimedev components.
 * @module nimedev.module
 */

import dialogModule from './dialog'
import inputsModule from './inputs'
import progressLinearModule from './progress-linear'
import toastModule from './toast'

/**
 * Module name
 */
export default angular
  .module('nimedev', [
    dialogModule,
    inputsModule,
    progressLinearModule,
    toastModule
  ])
  .name
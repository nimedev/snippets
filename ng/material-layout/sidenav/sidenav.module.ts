/**
 * Module for sidenav component.
 * @module sidenav.module
 */

import sidenavComponent from './sidenav.component'

/**
 * Module name
 */
export default angular
  .module('sidenav', [])
  .component('rmdSidenav', sidenavComponent)
  .name
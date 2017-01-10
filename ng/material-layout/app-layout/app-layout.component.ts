/**
 * Component use for main layout of the application
 * @module app-layout.component
 */

const template = require('./app-layout.html')
import './app-layout.css'

/**
 * Class representing a controller for app-layout component
 */
export class AppLayoutController {

  public sidenavOpen: boolean = false

  // Use the $inject property to ensure proper functionality after minification
  public static $inject = []

  /**
   * Create a controller
   */
  constructor() { }

  /**
   * Component initialization
   */
  $onInit() {
    this.sidenavOpen = false
  }

  /**
   * Change state of sidenav
   */
  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen
  }
}

/**
 * Component object
 */
const appLayoutComponent: ng.IComponentOptions = {
  controller: AppLayoutController,
  template
}

export default appLayoutComponent
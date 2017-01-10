/**
 * Component use for navigation sidenav
 * @module sidenav.component
 */

const template = require('./sidenav.html')
import './sidenav.css'

/**
 * Component object
 */
const sidenavComponent: ng.IComponentOptions = {
  bindings: {
    isVisible: '<',
    onToggleSidenav: '&'
  },
  template
}

export default sidenavComponent
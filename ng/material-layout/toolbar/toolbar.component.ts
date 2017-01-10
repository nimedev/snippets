/**
 * Toolbar for main layout
 * @module toolbar.component
 */

const template = require('./toolbar.html')
import './toolbar.css'

/**
 * Component object
 */
const toolbarComponent: ng.IComponentOptions = {
  bindings: {
    onToggleSidenav: '&'
  },
  template
}

export default toolbarComponent
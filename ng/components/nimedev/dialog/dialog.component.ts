/**
 * @module dialog.component
 */

const template = require('./dialog.component.html')
import './dialog.component.css'

/**
 * Class representing a controller for nmd-toast component
 */
export class DialogController {

  // Name of the component inserted in dialog
  private innerComponent: string

  // Use the $inject property to ensure proper functionality after minification
  public static $inject = ['$scope', 'dialogService', 'dialogListenersService']

  /**
   * Create a controller
   * @param {Object} $scope - to register the scope in a map of open dialogs.
   * @param {Object} dialogService - to get close dialog service.
   * @param {Object} dialogListenersService - to handle dialog listeners.
   */
  constructor(private $scope, private dialogService,
    private dialogListenersService) {

  }

  /** When component is linked */
  $postLink() {
    // Register the scope in dialogService
    this.dialogService.registerScope(this.innerComponent, this.$scope)

    // Initialize listeners and handlers
    this.dialogListenersService.create(this.innerComponent)
  }

  /** When destroy element */
  $onDestroy() {
    this.dialogListenersService.destroy()
  }

  /** Close dialog */
  close() {
    this.dialogService.close(this.innerComponent)
  }
}

/**
 * Component object
 */
const dialogComponent: ng.IComponentOptions = {
  bindings: {
    /** {boolean} indicate if show close button */
    closeBtn: '<',

    /** name of the component */
    innerComponent: '@ndComponent'
  },
  controller: DialogController,
  template,
  transclude: true
}

export default dialogComponent
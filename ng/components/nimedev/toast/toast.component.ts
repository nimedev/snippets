/**
 * Show material design toast messages.
 * @module toast.component
 */

const template = require('./toast.component.html')
import './toast.component.css'

/**
 * Class representing a controller for nmd-toast component
 */
export class ToastController {

  // Default function execute by toast button
  public btnAction: Function

  // Text of the action button
  public btnText: string = ''

  // Toast message
  public message: string

  // A reference to timmer that count close delay
  public timmer: Object

  // Use the $inject property to ensure proper functionality after minification
  public static $inject = ['$rootScope', '$scope', '$timeout', 'toastService']

  /**
   * Create a controller
   * @param {Object} $rootScope - to generate shown and hide events.
   * @param {Object} $scope - to register the scope in toastService.
   * @param {Object} $timeout - to create toast delay.
   * @param {Object} toastService - to get toast services.
   */
  constructor(private $rootScope, private $scope, private $timeout,
    private toastService) {

  }

  /** Initialization */
  $onInit() {
    let button = this.toastService.button
    this.btnAction = this.toastService.close
    this.message = this.toastService.message

    // Prepare action button
    if (button.text) {
      this.btnText = button.text
    }

    // Button action (default close)
    this.btnAction = (button.action) ? button.action : this.close
  }

  /** When component is linked */
  $postLink() {
    // Register the scope in toastService
    this.toastService.registerScope(this.$scope)

    // Generate 'toastShown' event
    this.$timeout(() => this.$rootScope.$emit('toastShown'), 50)

    // Start close timmer if duration is passed
    if (this.toastService.duration) {
      this.timmer = this.$timeout(() => this.toastService.close(),
        this.toastService.duration)
    }
  }

  /** When component is destroyed */
  $onDestroy() {
    // Cancel toast timmer
    this.$timeout.cancel(this.timmer)

    // Generate 'toastHide' event
    this.$rootScope.$emit('toastHide')
  }

  /** Call close toast service */
  close() {
    this.toastService.close()
  }
}

/**
 * Component Object
 */
const toastComponent: ng.IComponentOptions = {
  controller: ToastController,
  template
}

export default toastComponent
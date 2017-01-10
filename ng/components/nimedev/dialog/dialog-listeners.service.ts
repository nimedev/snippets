/**
 * Service used to create/destroy listeners for dialog component.
 * @module dialog-listeners.service
 */

/**
 * Class representing a dialogListenersService constructor function
 */
export default class DialogListenersService {

  // Listener to detect a posible change of route
  public changeListener: Function

  // Handler used for 'keydown' event
  public keydownHandler: Function

  // Use the $inject property to ensure proper functionality after minification
  public static $inject = ['$rootScope', '$window', 'dialogService']

  /**
   * Create a dialogListenersService
   * @param {Object} $rootScope - to catch state change event.
   * @param {Object} $window - to detect keyboard keys.
   * @param {Object} dialogService - to close the dialog.
   */
  constructor(private $rootScope, private $window, private dialogService) {

  }

  /**
   * Create listeners and handlers for dialog component
   * @param {string} innerComponent - name of the component that content the
   *  dialog
   */
  create(innerComponent) {
    // Handler for 'keydown' event. Listen cancel key
    this.keydownHandler = event => {
      const keyCode = event.keyCode

      // If key pressed is cancel (27). close de dialog
      if (keyCode === 27) {
        event.preventDefault()
        this.dialogService.close(innerComponent)
      }
    }
    this.$window.addEventListener('keydown', this.keydownHandler)

    // Detect a posible change of route
    this.changeListener = this.$rootScope.$on('$locationChangeStart', () => {
      // Close the dialog
      this.dialogService.close(innerComponent)
    })
  }

  /**
   * Destroy listeners and handlers of a dialog
   */
  destroy() {
    // Remove 'keydown' event handler
    this.keydownHandler &&
      this.$window.removeEventListener('keydown', this.keydownHandler)

    // Unsuscribe $locationChangeStart listener
    this.changeListener && this.changeListener()
  }
}
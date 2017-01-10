/**
 * Service to control nmd-toast component.
 * Only open one toast per time. if a toast is open and try to open other,
 * first close de old and then open the new one.
 * @module toast.service
 */

/**
 * Class representing a toastService constructor function
 */
export default class ToastService {

  // Used to store scope of open toast
  public openScope = null

  // Settings fileds
  public message: string = ''
  public duration: number = 4000
  public button: Object = {}

  // Use the $inject property to ensure proper functionality after minification
  public static $inject = ['$compile', '$rootScope', '$timeout']

  /**
   * Create a toastService
   * @param {Object} $compile - to compile new dialog directive.
   * @param {Object} $rootScope - to create new scope for compiled component.
   * @param {Object} $timeout - to generate delay to remove the element
   */
  constructor(private $compile, private $rootScope, private $timeout) {
    // Set default options for the toast
    this.setDefault()
  }

  /** Remove all open toast component. */
  close() {
    const openToast: any = this.openToasts

    // Remove component from scope
    this.openScope && this.openScope.$destroy()
    this.openScope = null

    if (openToast.length > 0) {
      // Add class for CSS animation
      openToast.addClass('is-closed')

      // Insert a delay to eliminate for CSS animation porpouses
      // and remove component from DOM.
      this.$timeout(() => openToast.remove(), 1000)
    }
  }

  /**
   * Register the scope in the service
   * @param {Object} scope - scope object of the dialog component.
   */
  registerScope(scope: Object) {
    this.openScope = scope
  }

  /**
   * Append a toast at end of body.
   * @param {String} msg - Text message of toast
   * @param {Object} options - options object:
   * {
   *   // Display time in milliseconds (0 to show permanently)
   *   duration: 4000,
   *
   *   // Action button (Don't show button if no provide it)
   *   button: {
   *     // Button text
   *     text: 'DISMISS',
   *
   *     // Callback function. If no action then close toast.
   *     action: () => {}
   *   }
   * }
   */
  show(msg, options) {
    const newToast: string = '<nmd-toast></nmd-toast>'
    const node: any = angular.element(document.body)

    // Remove old toast
    this.close()

    // Set default values
    this.setDefault()

    // Verify custom message
    if (msg) {
      this.message = msg
    }

    // Verify options
    if (options) {
      // Add duration
      if (options.duration !== undefined && options.duration >= 0) {
        this.duration = options.duration
      }

      // Add button settings
      if (options.button) {
        this.button = options.button
      }
    }

    // Compile dialog template and add to body
    node.append(this.$compile(newToast)(this.$rootScope))
  }

  /** SETTERS & GETTERS */
  /** @returns all open toasts elements */
  get openToasts() {
    const query = 'body > nmd-toast:not(.is-closed)'
    return angular.element(document.querySelectorAll(query))
  }

  /** HELPER FUNCTIONS */
  /** Set default values for toast */
  private setDefault() {
    this.message = ''
    this.duration = 4000
    this.button = {}
  }
}
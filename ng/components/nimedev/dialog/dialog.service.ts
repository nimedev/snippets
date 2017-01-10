/**
 * Service used to add nmd-dialog component in document body.
 * @module nmd-dialog.service
 */

/**
 * Class representing a dialogService constructor function
 */
export default class DialogService {

  // Name of the class to identify a open dialog in CSS styles
  public cssName: string = 'is-dialogOpen'

  // Map with the scopes create when open a dialog
  public scopesMap: Map<any, Object> = new Map()

  // Use the $inject property to ensure proper functionality after minification
  public static $inject = ['$compile', '$rootScope']

  /**
   * Create a dialogService
   * @param {Object} $compile - add dialog component to angular digest cycle
   * @param {Object} $rootScope - to create new scope for new component
   */
  constructor(private $compile, private $rootScope) {

  }

  /**
   * Remove a dialog component acording to nd-component attribute.
   * @param {String} component - Used to select the dialog to remove.
   */
  close(component) {
    const query: string = `nmd-dialog[nd-component=${component}]`
    const dialog: any = angular.element(document.querySelector(query))
    const scope: any = this.scopesMap.get(component)

    // remove component from scope
    if (scope) {
      scope.$ctrl.dialogListenersService.destroy()
      scope.$destroy()
      this.scopesMap.delete(component)
    }

    // Remove element from DOM
    dialog.remove()

    // Check if remove CSS classes related to dialog.
    this.toggleElements(false)
  }

  /**
   * Append a dialog at end of body and insert a component inside it.
   * @param {String} component - Name of component to insert in HTML format
   *  (component-name)
   * @param {Object} options - Object with option for dialog
      options = {
        closeBtn = false
      }
   */
  open(component, options = { closeBtn: false }) {
    const node: any = angular.element(document.body)
    const newDialog = `<nmd-dialog nd-component="${component}"`
      + ` close-btn="${options.closeBtn}">
      <${component} class="nmd-Dialog-component u-shadowFrame-5"></${component}>
    </nmd-dialog>`
    const oldDialog = document
      .querySelector(`body > nmd-dialog[nd-component=${component}]`)

    // Create new dialog if is no there a dialog with de same nd-component
    // attribute
    if (!oldDialog) {
      // Compile dialog template and add to body
      node.append(this.$compile(newDialog)(this.$rootScope))

      // Toggle classes in related elements
      this.toggleElements(true)
    }
  }

  /**
   * Register the scope in the dialogs map
   * @param {string} name - html name of the component that wrap the
   *  dialog.
   * @param {Object} scope - scope object of the dialog component.
   */
  registerScope(name: string, scope: Object) {
    this.scopesMap.set(name, scope)
  }

  /** HELPER FUNCTIONS */
  /**
   * Toggle class that indicate open dialog in body element
   * @param {Boolean} open - Indicate if open o close dialog.
   */
  private toggleElements(open: boolean) {
    const body: any = angular.element(document.body)
    const oldDialog: any = angular.element(document).find('nmd-dialog')

    // open dialog?
    if (open) {
      body.addClass(this.cssName)
    } else if (oldDialog.length < 1) {
      // remove class if is only 1 open dialogs
      body.removeClass(this.cssName)
    }
  }
}
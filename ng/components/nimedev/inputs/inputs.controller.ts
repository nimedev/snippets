/**
 * Class inherit for all components related to inputs with common methods for
 * all inputs components.
 * @module inputs.controller
 */

/**
 * Class representing a controller for inputs component
 */
export default class InputsController {

  // Bindings properties for child class
  public disabledName: string
  public errorObjName: string
  public formName: string
  public name: string
  public parentCtrl
  public requiredError: string

  /**
   * Create a controller
   */
  constructor() {

  }

  // GETTERS & SETTERS
  /**
   * @returns {boolean} true if disable the input
   */
  get disabled(): boolean {
    return this.disabledName ? this.parentCtrl[this.disabledName] : false
  }

  /**
   * @returns {boolean} true if input is invalid
   */
  get isValidInput(): boolean {
    return this.form ? this.form[this.name].$valid : true
  }

  /**
   * @returns {boolean} true if need required validation
   */
  get isRequired(): boolean {
    return this.requiredError !== undefined
  }

  /**
   * @returns {Object} a reference to form in parent controller
   */
  get form() {
    return this.parentCtrl[this.formName]
  }

  /**
   * @returns {boolean} true if form have errors.
   */
  get formError() {
    return this.form ? this.form[this.name].$error : false
  }

  /**
   * @returns {string} a bind to model property in parent controller
   */
  get ngModel(): string {
    return this.parentCtrl[this.name]
  }

  /**
   * @param {string} a value for bind to model property in parent controller
   */
  set ngModel(text) {
    this.parentCtrl[this.name] = text
  }

  /**
   * @returns {string} i18n namespace error text from server
   */
  get serverError(): string {
    const errorMsg = this.parentCtrl[this.errorObjName]
    return errorMsg ? `ERRORS.${errorMsg[this.name]}` : null
  }

  /**
   * @returns {boolean} true if can show error before touch or interact with
   * the input
   */
  get showErrors(): boolean {
    return this.form ?
      this.form.$dirty || this.form.$touched || this.form.$error.server : false
  }
}
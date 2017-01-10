/**
 * Component use to pick a date.
 * @module input-date.component
 */

import InputsController from '../inputs.controller'
const template = require('./input-date.component.html')
import './input-date.component.css'

/**
 * Class representing a controller for input-date component
 */
export class InputDateController extends InputsController {

  // public properties
  public avialableDays: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  public months: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  // Form properties
  public month
  public day
  public year

  // private properties
  private _days: number[] = []

  // Use the $inject property to ensure proper functionality after minification
  public static $inject = ['$scope']

  /**
   * Create a controller
   * @param {IScope} $scope - to watch form inputs.
   */
  constructor(private $scope: ng.IScope) {
    super()
  }

	/**
   * Component initialization
   */
  $onInit() {
    // This watcher is used to initialize inputs when date is avialable.
    const dateWatcher = this.$scope
      .$watch('$ctrl.date', (newDate: string) => {
        if (newDate !== undefined) {
          const date = new Date(newDate)
          this.month = date.getMonth()
          this.day = date.getDate()
          this.year = date.getFullYear()

          // Clear listerner because only is needed to initialization.
          dateWatcher()
        }
      })

    // Watch for changes in form inputs
    this.$scope.$watch('$ctrl.month', () => this.updateDate())
    this.$scope.$watch('$ctrl.day', () => this.updateDate())
    this.$scope.$watch('$ctrl.year', () => this.updateDate())
  }

  /**
   * Validate the date if has changes
   */
  checkDate() {
    const isValid = this.isValidYear && this.isValidMonth && this.isValidDay
    this.form[this.name].$setValidity('invalid-date', isValid)
  }

  /**
   * Update the binding date with the values of inputs.
   */
  updateDate() {
    if (this.year && this.month && this.day) {
      this.date = new Date(this.year, this.month, this.day)
      this.checkDate()
    }
  }

  // GETTERS & SETTERS
  /**
   * @returns {any} bindig date
   */
  get date(): any {
    return this.parentCtrl[this.name]
  }

  /**
   * @param {any} newDate - new date to set.
   */
  set date(newDate: any) {
    this.parentCtrl[this.name] = newDate.toISOString()
  }

  /**
   * @returns {Array} array with avaible day of month. 
   */
  get days(): any[] {
    this._days = this.avialableDays
    return this._days
  }

  /**
   * @returns {boolean} true if day of input date is valid
   */
  get isValidDay() {
    const date = new Date(this.year, this.month, this.day)
    return date.getDate() === this.day
  }

  /**
   * @returns {boolean} true if month of input date is valid
   */
  get isValidMonth() {
    const date = new Date(this.year, this.month, this.day)
    return date.getMonth() === this.month
  }

  /**
   * @returns {boolean} true if yesr of input date is valid
   */
  get isValidYear() {
    const date = new Date(this.year, this.month, this.day)
    return date.getFullYear() === this.year
  }
}

/**
 * Component object
 */
const inputDateComponent: ng.IComponentOptions = {
  bindings: {
    /** Id for input and label elements */
    id: '@',

    /** Controller of parent element */
    parentCtrl: '=',

    /** Name of input (Used in name attribute, ng-model and form validation) */
    name: '@',

    /** Name of form in parent controller */
    formName: '@',

    /** Name of error message object in parent controller */
    errorObjName: '@',

    /** i18n namespace used in label element */
    label: '@',

    /**
     * i18n namespace with labels for input (day, month, year, months and error
     * messages)
     */
    i18n: '@',

    /** Name of property in parent controller used to disable the input */
    disabledName: '@',

    /**
     * i18n namespace for invalid date error
     */
    invalidError: '@'
  },
  controller: InputDateController,
  template
}

export default inputDateComponent
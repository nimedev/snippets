/**
 * Component used to draw a input with label and error messages.
 * @module input.component
 */

import InputsController from '../inputs.controller'
const template = require('./input.component.html')

/**
 * Class representing a controller for input component
 */
export class InputController extends InputsController {

  // Use the $inject property to ensure proper functionality after minification
  public static $inject = []

  /**
   * Create a controller
   */
  constructor() {
    super()
  }
}

/**
 * Component object
 */
const inputComponent: ng.IComponentOptions = {
  bindings: {
    /** Type of the input */
    type: '@',

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

    /** Name of property in parent controller used to disable the input */
    disabledName: '@',

    /**
     * i18n namespace for required error if the you like activa require
     * validation
     */
    requiredError: '@',

    /** Max length used in ng-maxlength directive */
    maxlength: '@',

    /** i18n namespace for message of maxlength validation */
    maxlengthError: '@',

    /** Min validation used when type is number in ng-min directive */
    min: '@',

    /** i18n namespace for message of min validation */
    minError: '@'
  },
  controller: InputController,
  template
}

export default inputComponent
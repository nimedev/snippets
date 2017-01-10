/**
 * Select input for ygh webapp
 * @module select.component
 */

import InputsController from '../inputs.controller'
const template = require('./select.component.html')

/**
 * Class representing a controller for select component
 */
export class SelectController extends InputsController {

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
const selectComponent: ng.IComponentOptions = {
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
     * Array used in ng-options with (item in array) format.
     * Don't declare if use optionObj.
     */
    optionArray: '<',

    /**
     * i18n Namespace to append to item of array if use optionArray.
     */
    i18nItem: '@',

    /**
     * Object list if need use ng-options with (key, item) format.
     * Don't declare if use optionArray.
     * object: { key: 'keyName', list: {.....} }
     */
    optionObject: '<',

    /**
     * Name of key used when user optionObject ((key, item) format)
     * in ng-options
     */
    itemKey: '@',

    /** Name of property in parent controller used to disable the input */
    disabledName: '@',

    /**
     * i18n namespace for required error if the you like active require
     * validation
     */
    requiredError: '@'
  },
  controller: SelectController,
  template
}

export default selectComponent
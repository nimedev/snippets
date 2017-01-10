/**
 * Create a progress bar with material desgin style
 * @module progress-linear.component
 */

import './progress-linear.component.css'

/**
 * Component object
 */
const progressLinearComponent: ng.IComponentOptions = {
  bindings: {
    color: '@progressColor'
  },
  template: '<div class="nmd-ProgressLinear-content"'
  + ' ng-class="$ctrl.color"></div>'
}

export default progressLinearComponent
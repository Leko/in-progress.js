
import listen from 'good-listener'
import serialize from 'form-serialize'
import NullDetector from './NullDetector'

export default class FormValueDetector extends NullDetector {
  static tags = [
    'input',
    'textarea',
    'select'
  ]

  constructor (formEl, options = {}) {
    const elements = formEl instanceof NodeList ? Array.from(formEl) : [formEl]
    super(() => this.getValues(elements))
  }

  getValues (formElements) {
    return formElements.reduce((acc, formEl) =>
      Object.assign(acc, { [formEl.name]: serialize(formEl, { hash: true, empty: true }) })
    , {})
  }
}

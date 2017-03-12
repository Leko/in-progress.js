
import deepEqual from 'deep-equal'

export default class NullDetector {
  constructor (valueFn) {
    this.valueFn = valueFn
    this.initialValues = {}
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this)
  }

  handleBeforeUnload (e) {
    if (this.inProgress()) {
      e.returnValue = this.customMessage
      e.preventDefault()
      return this.customMessage
    } else {
      return null
    }
  }

  observe (customMessage) {
    this.reset()
    this.customMessage = customMessage
    window.addEventListener('beforeunload', this.handleBeforeUnload, false)
  }

  stopObserve () {
    window.removeEventListener('beforeunload', this.handleBeforeUnload, false)
    this.customMessage = null
  }

  reset () {
    this.initialValues = this.valueFn()
  }

  inProgress () {
    return this.hasChanges()
  }

  hasChanges () {
    return !deepEqual(this.initialValues, this.valueFn())
  }
}

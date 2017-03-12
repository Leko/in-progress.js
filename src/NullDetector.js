
import deepEqual from 'deep-equal'

export default class NullDetector {
  constructor (valueFn) {
    this.valueFn = valueFn
    this.initialValues = {}
  }

  observe (customMessage) {
    this.reset()
    this.listener = window.addEventListener('beforeunload', e => {
      if (this.inProgress()) {
        e.returnValue = customMessage
        e.preventDefault()
        return customMessage
      } else {
        return null
      }
    }, false)
  }

  stopObserve () {
    if (!this.listener) {
      throw new Error('Not listening')
    }
    this.listener.destroy()
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

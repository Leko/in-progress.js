
import listen from 'good-listener'
import deepEqual from 'deep-equal'

export default class NullDetector {
  constructor (valueFn) {
    this.valueFn = valueFn
    this.initialValues = {}
  }

  observe (customMessage) {
    this.reset()
    this.listener = listen(window, 'beforeunload', e => {
      if (this.inProgress()) {
        e.returnValue = customMessage
        e.preventDefault()
        return customMessage
      } else {
        return null
      }
    })
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
    return this.valuesChanged()
  }

  valuesChanged () {
    return deepEqual(this.initialValues, this.valueFn())
  }
}

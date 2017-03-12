/* eslint-env mocha */
import assert from 'assert'
import sinon from 'sinon'
import jsdom from 'mocha-jsdom'
import { NullDetector } from '../'

describe(NullDetector.name, () => {
  jsdom()

  describe('#constructor', () => {
    it('must have valueFn and initialValues', () => {
      const detector = new NullDetector(() => {})
      assert.ok(detector.valueFn)
      assert.ok(detector.initialValues)
    })
  })
  describe('#handleBeforeUnload', () => {
    it('must return null if not in progress', () => {
      const mockEvent = { returnValue: undefined, preventDefault: () => {} }
      const detector = new NullDetector(() => {})
      const stub = sinon.stub(detector, 'inProgress').returns(false)

      assert.ok(!detector.handleBeforeUnload(mockEvent))

      stub.restore()
    })
    it('must return string if in progress', () => {
      const expected = 'xxx'
      const mockEvent = { returnValue: undefined, preventDefault: () => {} }
      const detector = new NullDetector(() => {})
      const stub = sinon.stub(detector, 'inProgress').returns(true)
      detector.customMessage = expected

      assert.equal(detector.handleBeforeUnload(mockEvent), expected)

      stub.restore()
    })
  })
  describe('#observe', () => {
    it('must add listener beforeunload event to this.handleBeforeUnload', () => {
      const detector = new NullDetector(() => {})
      const spy = sinon.spy(window, 'addEventListener')

      detector.observe('xxx')

      assert.ok(spy.calledWith('beforeunload', detector.handleBeforeUnload, false))
      window.addEventListener.restore()
    })
  })
  describe('#stopObserve', () => {
    it('must remove listener beforeunload event to this.handleBeforeUnload', () => {
      const detector = new NullDetector(() => {})
      const spy = sinon.spy(window, 'removeEventListener')

      detector.stopObserve()

      assert.ok(spy.calledWith('beforeunload', detector.handleBeforeUnload, false))
      window.removeEventListener.restore()
    })
  })
  describe('#reset', () => {
    it('must set initialValues', () => {
      const expected = true
      const detector = new NullDetector(() => expected)
      detector.initialValues = null

      detector.reset()

      assert.equal(detector.initialValues, expected)
    })
  })
  describe('#inProgress', () => {
    it('must return false if not changes', () => {
      const detector = new NullDetector(() => {})
      const stub = sinon.stub(detector, 'hasChanges').returns(false)

      assert.ok(!detector.inProgress())
      stub.restore()
    })
    it('must return true if any changes', () => {
      const detector = new NullDetector(() => {})
      const stub = sinon.stub(detector, 'hasChanges').returns(true)

      assert.ok(detector.inProgress())
      stub.restore()
    })
  })
  describe('#hasChanges', () => {
    it('must return false if not changes', () => {
      const detector = new NullDetector(() => ({ a: 1 }))
      detector.initialValues = { a: 1 }

      assert.ok(!detector.hasChanges())
    })
    it('must return true if any changes', () => {
      const detector = new NullDetector(() => ({ a: 1 }))
      detector.initialValues = { a: 2 }

      assert.ok(detector.hasChanges())
    })
  })
})

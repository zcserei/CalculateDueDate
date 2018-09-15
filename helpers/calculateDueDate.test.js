const { assert } = require('chai')

const {
  isWorkDay,
  isWorkHour,
  isWorkTime,
} = require('./calculateDueDate')

describe('calculateDueDate helpers', () => {
  describe('isWorkDay', () => {
    it('should return true for work days', () => {
      assert.isTrue(isWorkDay(new Date(2018, 9, 17)))
      assert.isTrue(isWorkDay(new Date(2018, 9, 18)))
      assert.isTrue(isWorkDay(new Date(2018, 9, 19)))
      assert.isTrue(isWorkDay(new Date(2018, 9, 20)))
      assert.isTrue(isWorkDay(new Date(2018, 9, 21)))
    })

    it('should return false for non-work days', () => {
      assert.isFalse(isWorkDay(new Date(2018, 9, 16)))
      assert.isFalse(isWorkDay(new Date(2018, 9, 22)))
    })
  })

  describe('isWorkHour', () => {
    it('should return true for work hours', () => {
      assert.isTrue(isWorkHour(new Date(2018, 9, 17, 9)))
      assert.isTrue(isWorkHour(new Date(2018, 9, 17, 13)))
      assert.isTrue(isWorkHour(new Date(2018, 9, 17, 17)))
    })

    it('should return false for non-work hours', () => {
      assert.isFalse(isWorkHour(new Date(2018, 9, 17))) // nobody ever works at midnight yolo
      assert.isFalse(isWorkHour(new Date(2018, 9, 17, 8)))
      assert.isFalse(isWorkHour(new Date(2018, 9, 17, 17, 0, 1))) // ReferenceError: overtime is not defined
      assert.isFalse(isWorkHour(new Date(2018, 9, 17, 18)))
    })
  })

  describe('isWorkTime', () => {
    it('should return true for work hours on work days', () => {
      assert.isTrue(isWorkTime(new Date(2018, 9, 17, 9)))
    })

    it('should return false for work hours on non-work days', () => {
      assert.isFalse(isWorkTime(new Date(2018, 9, 16, 13)))
    })

    it('should return false for non-work hours on work days', () => {
      assert.isFalse(isWorkTime(new Date(2018, 9, 17, 8)))
    })

    it('should return false for non-work hours on non-work days', () => {
      assert.isFalse(isWorkTime(new Date(2018, 9, 16, 8)))
    })
  })
})
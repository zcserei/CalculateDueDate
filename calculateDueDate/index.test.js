const { assert } = require('chai')

const { calculateDueDate } = require('./index')

describe('calculateDueDate', () => {
  describe('Submissions', () => {
    it('should not accept submission dates that are not Date objects', () => {
      assert.throws(() => { calculateDueDate('Monday morning', 42) }, 'Submission date must be a valid Date object')
    })

    it('should not accept turnaround times that are not numbers', () => {
      assert.throws(() => { calculateDueDate(new Date(2018, 8, 14, 13), 'two hours') }, 'Turnaround time must be a number')
    })

    // while for some values -- e.g. 3.5 below -- the calculation is straightforward,
    // this is a simple way to avoid situations where we might end up with split seconds -- e.g. for 1.337 hours
    // handling values with e.g. up to two decimal places might be a good idea, but introduces further complexity
    // and most people probably don't estimate a task to take 3.19 hours anyway
    it('should not accept turnaround times that are not integers', () => {
      assert.throws(() => { calculateDueDate(new Date(2018, 8, 14, 13), 3.5) }, 'Turnaround time must be an integer')
    })

    it('should not accept invalid submission days', () => {
      assert.throws(() => { calculateDueDate(new Date(2018, 8, 16), 2) }, 'Invalid submission date or time')
    })

    it('should not accept invalid submission times', () => {
      assert.throws(() => { calculateDueDate(new Date(2018, 8, 17, 8), 2) }, 'Invalid submission date or time')
    })

    it('should not accept submission times from the future', () => {
      assert.throws(() => { calculateDueDate(new Date(2023, 8, 14), 2) }, 'Invalid submission date or time')
    })

    it('should accept valid submissions', () => {
      assert.doesNotThrow(() => { calculateDueDate(new Date(2018, 8, 14, 13), 2) }, Error)
    })
  })

  describe('Calculate target date within day', () => {
    it('should calculate target date within same day', () => {
      assert.equal(calculateDueDate(new Date(2018, 8, 14, 13), 2).getTime(), new Date(2018, 8, 14, 15).getTime())
    })
  })

  describe('Calculate target date within week', () => {
    it('should calculate target date for the next day', () => {
      assert.equal(calculateDueDate(new Date(2018, 8, 10, 9), 10).getTime(), new Date(2018, 8, 11, 11).getTime())
    })

    it('should calculate target date for the day following next day', () => {
      assert.equal(calculateDueDate(new Date(2018, 8, 10, 13), 16).getTime(), new Date(2018, 8, 11, 13).getTime())
    })
  })

  describe('Calculate target date skipping weekend', () => {
    it('should calculate target date for the next week', () => {
      assert.equal(calculateDueDate(new Date(2018, 8, 14, 13), 8).getTime(), new Date(2018, 8, 17, 13).getTime())
    })
  
    it('should calculate target date for the week following next week', () => {
      // the answer to life, universe and everything
      // but if you have tasks comprising 42 hours of work
      // you're doing it wrong
      // sorry, not sorry ¯\_(ツ)_/¯
      assert.equal(calculateDueDate(new Date(2018, 8, 14, 16), 42).getTime(), new Date(2018, 8, 24, 10).getTime())
    })
  })
})
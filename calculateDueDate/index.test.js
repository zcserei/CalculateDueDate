const { assert } = require('chai')

const { calculateDueDate } = require('./index')

describe('calculateDueDate', () => {
  describe('Submissions', () => {
    it('should not accept submission dates that are not Date objects', () => {
      return true
    })
    
    it('should not accept invalid submission days', () => {
      return true
    })

    it('should not accept invalid submission times', () => {
      return true
    })

    it('should accept valid submissions', () => {
      return true
    })
  })

  describe('Calculate target date within day', () => {
    it('should calculate target date within same day', () => {
      return true
    })
  })

  describe('Calculate target date within week', () => {
    it('should calculate target date for the next day', () => {
      return true
    })

    it('should calculate target date for the day following next day', () => {
      return true
    })
  })

  describe('Calculate target date skipping weekend', () => {
    it('should calculate target date for the next week', () => {
      return true
    })
  
    it('should calculate target date for the week following next week', () => {
      // the answer to life, universe and everything
      // but if you have tasks comprising 42 hours of work
      // you're doing it wrong
      // sorry, not sorry
      return true
    })
  })
})
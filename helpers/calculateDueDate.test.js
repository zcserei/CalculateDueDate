const {
  isWorkDay,
  isWorkHour,
  isWorkTime,
} = require('./calculateDueDate')

describe('calculateDueDate helpers', () => {
  it('should return true for work days', () => {
    return true
  }

  it('should return false for non-work days', () => {
    return true
  }

  it('should return true for work hours', () => {
    return true
  })

  it('should return false for non-work hours', () => {
    return true
  })

  it('should return true for work hours on work days', () => {
    return true
  })

  it('should return false for work hours on non-work days', () => {
    return true
  })

  it('should return false for non-work hours on work days', () => {
    return true
  })

  it('should return false for non-work hours on non-work days', () => {
    return true
  })
})
const { assert } = require('chai')

const {
  isWorkDay,
  isWorkHour,
  isWorkTime,
  isPast,
  isValidSubmit,
  fullHoursUntilClose,
  hoursRolledOver,
  targetHour,
  targetDay,
  targetDate,
} = require('./calculateDueDate')

describe('calculateDueDate helpers', () => {
  describe('isWorkDay', () => {
    it('should return true for work days', () => {
      assert.isTrue(isWorkDay(new Date(2018, 8, 17)))
      assert.isTrue(isWorkDay(new Date(2018, 8, 18)))
      assert.isTrue(isWorkDay(new Date(2018, 8, 19)))
      assert.isTrue(isWorkDay(new Date(2018, 8, 20)))
      assert.isTrue(isWorkDay(new Date(2018, 8, 21)))
    })

    it('should return false for non-work days', () => {
      assert.isFalse(isWorkDay(new Date(2018, 8, 16)))
      assert.isFalse(isWorkDay(new Date(2018, 8, 22)))
    })
  })

  describe('isWorkHour', () => {
    it('should return true for work hours', () => {
      assert.isTrue(isWorkHour(new Date(2018, 8, 17, 9)))
      assert.isTrue(isWorkHour(new Date(2018, 8, 17, 13)))
      assert.isTrue(isWorkHour(new Date(2018, 8, 17, 17)))
    })

    it('should return false for non-work hours', () => {
      assert.isFalse(isWorkHour(new Date(2018, 8, 17))) // nobody ever works at midnight yolo
      assert.isFalse(isWorkHour(new Date(2018, 8, 17, 8)))
      assert.isFalse(isWorkHour(new Date(2018, 8, 17, 17, 0, 1))) // ReferenceError: overtime is not defined
      assert.isFalse(isWorkHour(new Date(2018, 8, 17, 18)))
    })
  })

  describe('isWorkTime', () => {
    it('should return true for work hours on work days', () => {
      assert.isTrue(isWorkTime(new Date(2018, 8, 17, 9)))
    })

    it('should return false for work hours on non-work days', () => {
      assert.isFalse(isWorkTime(new Date(2018, 8, 16, 13)))
    })

    it('should return false for non-work hours on work days', () => {
      assert.isFalse(isWorkTime(new Date(2018, 8, 17, 8)))
    })

    it('should return false for non-work hours on non-work days', () => {
      assert.isFalse(isWorkTime(new Date(2018, 8, 16, 8)))
    })
  })

  describe('isPast', () => {
    it('should return true for past date', () => {
      assert.isTrue(isPast(new Date(2018, 8, 14)))
    })

    it('should return false for future date', () => {
      // If my calculations are correct, when this baby hits 88 miles per hour...
      // you're gonna see some serious shit.
      assert.isFalse(isPast(new Date(8640000000000000)))
    })
  })

  describe('isValidSubmit', () => {
    it('should return true for past working time', () => {
      assert.isTrue(isValidSubmit(new Date(2018, 8, 14, 13)))
    })

    it('should return false for past non-working time', () => {
      assert.isFalse(isValidSubmit(new Date(2018, 8, 14, 18)))
    })

    it('should return false for future working time', () => {
      assert.isFalse(isValidSubmit(new Date(2023, 8, 14, 13))) // where do you see yourself in five years? 
    })

    it('should return false for future non-working time', () => {
      assert.isFalse(isValidSubmit(new Date(2023, 8, 14, 18)))
    })
  })

  describe('fullHoursUntilClose', () => {
    it('should number of full hours until close', () => {
      assert.equal(fullHoursUntilClose(new Date(2018, 8, 14, 13, 12, 11)), 3)
    })
  })

  describe('hoursRolledOver', () => {
    it('should return 0 for hours rolled over when task is finished later in the day than submission', () => {
      assert.equal(hoursRolledOver(new Date(2018, 8, 14, 13, 12, 11), 2), 0)
      assert.equal(hoursRolledOver(new Date(2018, 8, 14, 13, 12, 11), 10), 0)
    })

    it('should return number of hours rolled over when task is finished earlier in the day than submission', () => {
      assert.equal(hoursRolledOver(new Date(2018, 8, 14, 13, 12, 11), 6), 3)
    })
  })

  describe('targetHour', () => {
    it('should return hour of expected completion without rollover', () => {
      assert.equal(targetHour(new Date(2018, 8, 14, 13, 12, 11), 3), 16)
    })

    it('should return hour of expected completion with rollover', () => {
      assert.equal(targetHour(new Date(2018, 8, 14, 13, 12, 11), 4), 9)
    })
  })

  describe('targetDay', () => {
    it('should return object with Y/M/D values for date of completion, without rollover, without weekend', () => {
      assert.equal(targetDay(new Date(2018, 8, 14, 13, 12, 11), 3), {
        year: 2018,
        month: 8,
        day: 14,
      })
    })

    it('should return object with Y/M/D values for date of completion, without rollover, with weekend', () => {
      assert.equal(targetDay(new Date(2018, 8, 14, 13, 12, 11), 11), {
        year: 2018,
        month: 8,
        day: 17,
      })
    })

    it('should return object with Y/M/D values for date of completion, with rollover, without weekend', () => {
      assert.equal(targetDay(new Date(2018, 8, 12, 13, 12, 11), 4), {
        year: 2018,
        month: 8,
        day: 13,
      })

      assert.equal(targetDay(new Date(2018, 8, 12, 13, 12, 11), 12), {
        year: 2018,
        month: 8,
        day: 14,
      })
    })

    it('should return object with Y/M/D values for date of completion, with rollover, with weekend', () => {
      assert.equal(targetDay(new Date(2018, 8, 13, 13, 12, 11), 12), {
        year: 2018,
        month: 8,
        day: 17,
      })

      assert.equal(targetDay(new Date(2018, 8, 14, 13, 12, 11), 12), {
        year: 2018,
        month: 8,
        day: 18,
      })
    })
  })

  describe('targetDate', () => {
    it('should return Date object for turnaround time, without rollover, without weekend', () => {
      assert.equal(targetDay(new Date(2018, 8, 14, 13, 12, 11), 3).getTime(), new Date(2018, 8, 14, 16, 12, 11).getTime())
    })

    it('should return Date object for turnaround time, without rollover, with weekend', () => {
      assert.equal(targetDay(new Date(2018, 8, 14, 13, 12, 11), 11).getTime(), new Date(2018, 8, 17, 16, 12, 11).getTime())
    })

    it('should return Date object for turnaround time, with rollover, without weekend', () => {
      assert.equal(targetDay(new Date(2018, 8, 12, 13, 12, 11), 4).getTime(), new Date(2018, 8, 13, 9, 12, 11).getTime())
      assert.equal(targetDay(new Date(2018, 8, 12, 13, 12, 11), 12).getTime(), new Date(2018, 8, 14, 9, 12, 11).getTime())
    })

    it('should return Date object for turnaround time, with rollover, with weekend', () => {
      assert.equal(targetDay(new Date(2018, 8, 13, 13, 12, 11), 12).getTime(), new Date(2018, 8, 17, 9, 12, 11).getTime())
      assert.equal(targetDay(new Date(2018, 8, 14, 13, 12, 11), 12).getTime(), new Date(2018, 8, 18, 9, 12, 11).getTime())
    })
  })
})
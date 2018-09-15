const {
  isValidSubmit
} = require('../helpers/calculateDueDate')

const calculateDueDate = (submitDate, turnaroundTime) => {
  if (Object.prototype.toString.call(submitDate) !== "[object Date]") {
    throw new Error('Submission date must be a valid Date object')
  }

  if (!isValidSubmit(submitDate)) {
    throw new Error('Invalid submission date or time')
  }

  if (typeof turnaroundTime !== 'number') {
    throw new Error('Turnaround time must be a number')
  }

  if (!Number.isInteger(turnaroundTime)) {
    throw new Error('Turnaround time must be an integer')
  }
}

module.exports = { calculateDueDate }
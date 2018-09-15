const isWorkDay = (date) => {
  const day = date.getDay()

  return day % 6 !== 0
}

const isWorkHour = (date) => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  if ((hour >= 9 && hour < 17) || (hour === 17 && minute === 0 && second === 0)) {
    return true
  } else {
    return false
  }
}

const isWorkTime = (date) => {
  return isWorkDay(date) && isWorkHour(date)
}

const isPast = (date) => {
  const now = new Date(Date.now())

  return date > now ? false : true
}

const isValidSubmit = (date) => {
  return isWorkTime(date) && isPast(date)
}

const fullHoursUntilClose = (date) => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const remainingFullHours = Math.floor((17 * 3600 - hour * 3600 - minute * 60 - second)/3600)

  return remainingFullHours
}

const hoursRolledOver = (date, turnaroundTime) => {
  const withoutFullDays = turnaroundTime % 8
  const hoursUntilClose = fullHoursUntilClose(date)
  let hoursRolledOver = 0 // let's assume no rollover

  if (withoutFullDays > hoursUntilClose) {
    hoursRolledOver = withoutFullDays - hoursUntilClose
  }

  return hoursRolledOver
}

const targetHour = (date, turnaroundTime) => {
  const rolledOver = hoursRolledOver(date, turnaroundTime)
  let targetHour = rolledOver
    ? 9 + rolledOver - 1
    : date.getHours() + turnaroundTime % 8

  return targetHour
}

module.exports = {
  isWorkDay,
  isWorkHour,
  isWorkTime,
  isPast,
  isValidSubmit,
  fullHoursUntilClose,
  hoursRolledOver,
  targetHour,
}

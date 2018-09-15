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

module.exports = {
  isWorkDay,
  isWorkHour,
  isWorkTime,
  isPast,
  isValidSubmit,
}

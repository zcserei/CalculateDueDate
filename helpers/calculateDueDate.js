const OPENHOUR = 9
const CLOSEHOUR = 17
const HOUR = 3600
const MINUTE = 60

const isWorkDay = (date) => {
  const day = date.getDay()

  return day % 6 !== 0
}

const isWorkHour = (date) => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  if ((hour >= OPENHOUR && hour < CLOSEHOUR) || (hour === CLOSEHOUR && minute === 0 && second === 0)) {
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
  const hourCount = date.getHours()
  const minuteCount = date.getMinutes()
  const secondCount = date.getSeconds()

  const remainingFullHours = Math.floor((17 * HOUR - hourCount * HOUR - minuteCount * MINUTE - secondCount)/HOUR)

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
    ? OPENHOUR + rolledOver
    : date.getHours() + turnaroundTime % 8

  return targetHour
}

const targetDay = (date, turnaroundTime) => {
  let rolledOver = hoursRolledOver(date, turnaroundTime)
  let fullWorkDays = Math.floor(turnaroundTime/8)
  
  const rolledOverDays = date.getDay() === 5 ? 3 : 1
  console.log('rolledOver')
  console.log(rolledOver)
  console.log('----')
  console.log(hoursRolledOver(new Date(2018, 8, 14, 16), 42))
  console.log('----')
  if (rolledOver > 0) {
    date.setDate(date.getDate() + rolledOverDays)
  }
  console.log('fullWorkDays')
  console.log(fullWorkDays)
  while (fullWorkDays > 0) {

    date.setDate(date.getDate() + 1)

    if (isWorkDay(date)) {
      fullWorkDays -= 1
    }
  } 


  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  }
}

const targetDate = (date, turnaroundTime) => {
  const day = targetDay(date, turnaroundTime)
  const hour = targetHour(date, turnaroundTime)

  return new Date(
    day.year,
    day.month,
    day.day,
    hour,
    date.getMinutes(),
    date.getSeconds()
  )
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
  targetDay,
  targetDate,
}

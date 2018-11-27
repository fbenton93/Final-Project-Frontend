
// accepts a float like 6.5 and returns '6:30 AM'; 13.5 would return '1:30 PM'
export function floatsToTime(float) {
  let halfOfDay = ''
  if (float >= 12) {
    halfOfDay = "PM"
  } else {
    halfOfDay = "AM"
  }

  let hours = Math.floor(float)
  let minutes = ((float % 1) * 60)

  if (minutes == 0) {
    minutes = "00"
  }
  if (float >= 13) {
    hours -= 12
  }

  return `${hours}:${minutes} ${halfOfDay}`
}

export function linkifyGoogle(addressOne,addressTwo) {
  const address = `${addressOne.split(' ').join('+')}+${addressTwo.split(' ').join('+')}`
  return `https://www.google.com/maps/place/${address}`
}

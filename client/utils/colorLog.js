const chalk = require('chalk')
import {inspect} from 'util'

// const _log  = () => Function.prototype.bind.call(console.log, console, 'LOG_ALIAS')

export const log = (color, message) => console.log(chalk[`${color}`](`${inspect(message)}`))

export const colorLog = (message, color, background) => {
  color = color || "black";
  if (background) {
    console.log(`%c` + `${message}`, `color:` + `${color};background:${background}`)
  } else {
    console.log(`%c` + `${message}`, `color:` + `${color}`)
  }
}

// module.exports =  {
//   log,
//   colorLog
// }

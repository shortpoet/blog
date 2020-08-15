const chalk = require('chalk')
import {inspect} from 'util'

// const _log  = () => Function.prototype.bind.call(console.log, console, 'LOG_ALIAS')

/*
https://github.com/chalk/chalk
Colors

    black
    red
    green
    yellow
    blue
    magenta
    cyan
    white
    blackBright (alias: gray, grey)
    redBright
    greenBright
    yellowBright
    blueBright
    magentaBright
    cyanBright
    whiteBright

Background colors

    bgBlack
    bgRed
    bgGreen
    bgYellow
    bgBlue
    bgMagenta
    bgCyan
    bgWhite
    bgBlackBright (alias: bgGray, bgGrey)
    bgRedBright
    bgGreenBright
    bgYellowBright
    bgBlueBright
    bgMagentaBright
    bgCyanBright
    bgWhiteBright

*/

export const chalkLog = (color, message) => console.log(chalk[`${color}`](`${inspect(message)}`))

type Options = {
  color: string;
  background: string
}

export function colorLog(message: string, options?: number): void;
export function colorLog(message: string, options?: (number | Options)): void {
  let color;
  let background;
  let _options: Options = {} as Options
  // use strict null check double bang to account for !0 being true
  // but then !!1 is true
  if (options == null) {
    _options.color = "magenta";
    _options.background = "yellow";
    options = _options;
  }
  if (typeof options == "object") {
    color = options.color;
    background = options.background;
  } else if (typeof options == "number") {
    switch (options) {
      case 1:
        color = "green";
        background = "yellow";
        break;
        
      default:
        color = "magenta";
        background = "yellow";
      break;
    }
  }
  console.log(`%c` + `${message}`, `color:` + `${color};background:${background}`)
}

// module.exports =  {
//   log,
//   colorLog
// }

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

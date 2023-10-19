const util = require('util');

function toString(...args) {
  const result = args.reduce((pr, curr, index) => {
    if (typeof curr === 'object') return pr + util.inspect(curr, {colors: true});
    return pr + curr + ((index != args.length - 1) ? ' ' : '');
  }, '');

  return result;
}

module.exports = {
  Reset()             {return '\x1b[0m';},

  Bright(...args)     {return '\x1b[1m' + toString(...args) + this.Reset();},
  Dim()               {return '\x1b[2m';},
  Underscore()        {return '\x1b[4m';},
  Blink()             {return '\x1b[5m';},
  Reverse()           {return '\x1b[7m';},
  Hidden()            {return '\x1b[8m';},

  FgBlack(...args)    {return '\x1b[30m' + toString(...args) + this.Reset();},
  FgRed(...args)      {return '\x1b[31m' + toString(...args) + this.Reset();},
  FgGreen(...args)    {return '\x1b[32m' + toString(...args) + this.Reset();},
  FgYellow(...args)   {return '\x1b[33m' + toString(...args) + this.Reset();},
  FgBlue(...args)     {return '\x1b[34m' + toString(...args) + this.Reset();},
  FgMagenta(...args)  {return '\x1b[35m' + toString(...args) + this.Reset();},
  FgCyan(...args)     {return '\x1b[36m' + toString(...args) + this.Reset();},
  FgWhite(...args)    {return '\x1b[37m' + toString(...args) + this.Reset();},

  BgBlack(...args)    {return '\x1b[40m' + toString(...args) + this.Reset();},
  BgRed(...args)      {return '\x1b[41m' + toString(...args) + this.Reset();},
  BgGreen(...args)    {return '\x1b[42m' + toString(...args) + this.Reset();},
  BgYellow(...args)   {return '\x1b[43m' + toString(...args) + this.Reset();},
  BgBlue(...args)     {return '\x1b[44m' + toString(...args) + this.Reset();},
  BgMagenta(...args)  {return '\x1b[45m' + toString(...args) + this.Reset();},
  BgCyan(...args)     {return '\x1b[46m' + toString(...args) + this.Reset();},
  BgWhite(...args)    {return '\x1b[47m' + toString(...args) + this.Reset();},

  Raw(...args)        {return toString(...args);},

  Status(status) {
    status = Number(status);
    return  status < 300                  ? this.FgBlack(this.BgGreen(status)) :
            status >= 300 && status < 500 ? this.FgBlack(this.BgYellow(status)) :
                                            this.FgBlack(this.BgRed(status));
  }
};

import winston from 'winston'
import winstonDailyRotateFile from 'winston-daily-rotate-file'
import moment from 'moment'
import path from 'path'

winston.remove(winston.transports.Console)
winston.add(winstonDailyRotateFile, {
  level: 'info',
  prepend: true,
  handleExceptions: true,
  humanReadableUnhandledException: true,
  timestamp: () => moment().format(),
  colorize: true,
  filename: path.resolve('./logs/server.log'),
  maxsize: 10485760,
  maxfiles: 30,
})

console.log = winston.info
console.info = winston.info
console.warn = winston.warn
console.error = winston.error
console.debug = winston.debug

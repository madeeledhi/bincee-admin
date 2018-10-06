// src
export * from './appUtils'
export * from './errorUtils'
export * from './fileUtils'
export * from './geocodingUtils'
export { default as networkIO } from './networkIO'

export const build404ErrorHandler = options => (req, res) => {
  res.status(404)

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url })
    return
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ errorMessage: 'Page not found' })
    return
  }

  // default to plain-text. send()
  res.type('txt').send('Not found')
}

export const handle500Error = (err, req, res) => {
  const m = `An internal server error occurred: ${err}`
  console.error(
    '\x1b[31m',
    'An internal server error occurred: ',
    err.stack,
    '\x1b[0m',
  )

  res.status(500)

  // respond with html page
  if (req.accepts('html')) {
    res.render('500', { errorMessage: m })
    return
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ errorMessage: m })
    return
  }

  // default to plain-text. send()
  res.type('txt').send(m)
}

export const build500ErrorHandler = options => (err, req, res, next) => handle500Error(err, req, res)

export const makeUID = (): string => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  const r = (Math.random() * 16) | 0
  const v = c === 'x' ? r : (r & 0x3) | 0x8
  return v.toString(16)
})

export const timeout = (ms, promise) => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('timeout'))
  }, ms)
  promise.then(resolve, reject)
})

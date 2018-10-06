// libs
import type { $Response } from 'express'

const reportError = (res, status, message) => {
  res.status(status)
  res.send({ message })
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'NotFoundError'
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'BadRequestError'
  }
}

export class InternalServerError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'InternalServerError'
  }
}

export class FetchDataError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'FetchDataError'
  }
}

export class DataValidationError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'DataValidationError'
  }
}

export class RedisError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'RedisError'
  }
}

export class DataExistsError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'DataExistsError'
  }
}

export class DataTransformationError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'DataProcessingError'
  }
}

export class AccessDeniedError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'AccessDeniedError'
  }
}

const handleErrorResponse = (res, error) => {
  const m = `${error}`
  console.error('\x1b[31m', m)
  console.error(error.stack, '\x1b[0m')

  if (
    error
    && (error instanceof BadRequestError
      || error.name === 'BadRequestError'
      || error instanceof InternalServerError
      || error.name === 'InternalServerError'
      || error instanceof NotFoundError
      || error.name === 'NotFoundError'
      || error instanceof AccessDeniedError
      || error.name === 'AccessDeniedError')
  ) {
    if (error instanceof BadRequestError || error.name === 'BadRequestError') {
      res.status(400)
    } else if (
      error instanceof NotFoundError
      || error.name === 'NotFoundError'
    ) {
      res.status(404)
    } else if (
      error instanceof InternalServerError
      || error.name === 'InternalServerError'
    ) {
      res.status(500)
    } else if (
      error instanceof AccessDeniedError
      || error.name === 'AccessDeniedError'
    ) {
      res.status(401)
    }
  } else {
    res.status(500)
  }

  res.send({ message: m })
}

/**
 * Checks the request has Okay response else throws exception
 *
 * @export
 * @param {any} response
 * @returns {JSON | Error}
 */
export function handleFetchResponse(response) {
  if (response instanceof Array) {
    return Promise.all(response.map(res => handleFetchResponse(res)))
  }
  if (!response.ok || response.status !== 200) {
    throw response
  }
  return response.json()
}

/**
 * handles the catch logic for Fetch
 * Supports Error  instances as well as JSON error responses
 * returns a call to handleErrorResponse util function or sends error response via res.send()
 * Can be used with  or without res as param
 * @export
 * @param {any} err
 * @param {$Response} res
 * @returns {handleErrorResponse() || res.send() || console.error() }
 */
export function handleError(err, res: ?$Response) {
  if (err instanceof Error) {
    if (res) {
      return handleErrorResponse(res, err)
    }
    return console.error(err)
  }
  const { status } = err
  const errorText = err
    .text()
    .then(errMessage => errMessage)
    .catch(console.error('No error Message in JSON err.text()'))
  if (res) {
    return res.status(status || 500).send(errorText)
  }
  return console.error(`Error status is ${status} and Error is${errorText}`)
}

export default {
  reportError,
  NotFoundError,
  AccessDeniedError,
  BadRequestError,
  InternalServerError,
}

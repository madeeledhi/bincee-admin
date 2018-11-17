import { Schema, arrayOf, normalize } from 'normalizr'
import 'isomorphic-fetch'

const delay = 0

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, options) {
  const promise = new Promise(resolve => {
    if (delay > 0) {
      setTimeout(() => resolve(), delay)
    } else {
      resolve()
    }
  })

  return (
    promise
      .then(() => fetch(endpoint, options))
      /*
    // this part copied from here: https://blog.hospodarets.com/fetch_in_action
    .then(response => {
      const {status, statusText} = response

      // status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
      if (status === 200 || status === 0) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(statusText)
      }
    })
    */
      .then(response => response.json().then(json => ({ json, response })))
      .then(({ json, response: { ok } }) => {
        if (!ok) {
          return Promise.reject(json)
        }

        // const camelizedJson = camelizeKeys(json)
        // const nextPageUrl = getNextPageUrl(response)

        /*
      return Object.assign({},
        normalize(json, schema)
      )
      */

        return json
      })
  )
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

const eventSchema = new Schema('events')
const eventInteractionSchema = new Schema('eventInteractions')
const userSchema = new Schema('users')

eventSchema.define({
  eventInteractions: arrayOf(eventInteractionSchema),
})

// Schemas for Github API responses.
export const Schemas = {
  EVENT: eventSchema,
  EVENT_ARRAY: arrayOf(eventSchema),
  EVENT_INTERACTION: eventInteractionSchema,
  EVENT_INTERACTION_ARRAY: arrayOf(eventInteractionSchema),
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, fetchOptions } = callAPI
  const { schema, types, method, type, token } = callAPI

  if (type) {
    return new Promise(resolve => resolve(next(actionWith(callAPI))))
  }

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]

    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(
    actionWith({
      type: requestType,
    }),
  )

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const Authorization = `Bearer ${token}`
  if (!fetchOptions) {
    fetchOptions = {
      method: method || 'GET',
      headers: token ? { ...headers, Authorization } : headers,
      body: JSON.stringify(action.payload),
    }
  }

  return callApi(endpoint, schema, fetchOptions).then(
    response =>
      next(
        actionWith({
          payload: response,
          type: response.status === 200 ? successType : failureType,
        }),
      ),
    error =>
      next(
        actionWith({
          type: failureType,
          payload: error,
        }),
      ),
  )
}

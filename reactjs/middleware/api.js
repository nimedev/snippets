/**
 * @module api
 * @memberOf redux/middleware
 */

import 'whatwg-fetch'
import { constants } from '../../constants'

const API_ROOT = constants.restUrl

// Fetches an API response and normalizes the result JSON.
const callApi = (endpoint, config = {}) => {

  return fetch(`${API_ROOT}/${endpoint}`, config)
    .then(response => {
      if ( response.status !== 204 ) {
        return response.json().then(json => ({ json, response }))
      }
      return { json: null, response }
    })
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    })
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { types, config } = callAPI

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

  const [requestType, successType, failureType] = types
  next({ type: requestType })

  return callApi(endpoint, config)
    .then(response => next({
      type: successType,
      payload: {
        response,
        receivedAt: new Date()
      }
    }))
    .catch(error => next({
      type: failureType,
      payload: error,
      error: true
    }))
}
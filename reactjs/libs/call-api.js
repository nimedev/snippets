/**
 * Fetches an API response and normalizes the result JSON.
 * @module call-api
 */

import { REST_URL } from '../constants'

export default (endpoint, config = {}) => {

  return fetch(`${REST_URL}/${endpoint}`, config)
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
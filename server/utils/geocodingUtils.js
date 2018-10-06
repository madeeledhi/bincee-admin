// libs
import 'isomorphic-fetch'
import getOr from 'lodash/fp/getOr'
import path from 'path'
import size from 'lodash/size'
import toLower from 'lodash/toLower'
import URLSearchParams from 'url-search-params'

// src
// import coordinates from '../../shared/coordinates.json'
import { readJSONFile } from './fileUtils'
import { handleFetchResponse } from './errorUtils'

type Latitude = number
type Longitude = number
type Coordinates = [Longitude, Latitude]

const API_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json'
const GOOGLE_API_KEY = 'AIzaSyC84vnv1_VmwTpDu7LNhjjIvsq-rEfIcQ4'

const getUrl = address => {
  const query = new URLSearchParams({ address, key: GOOGLE_API_KEY }).toString()
  const url = `${API_ENDPOINT}?${query}`

  return url
}

/**
 * Pass any address, i.e. City and it will return coordinates of that address.
 * @param {string} address
 * @returns {Coordinates} see types defined above
 */
export const getCoordinates = (...args) => {
  const address = args
    .filter(arg => arg && toLower(arg) !== 'not set')
    .join(', ')
    .toLowerCase()

  return readJSONFile(path.resolve('./shared/coordinates.json'))
    .then(coordinates => {
      if (size(coordinates[address]) === 2) {
        return coordinates[address]
      }

      throw Error('Coordinates not found')
    })
    .catch(() => fetch(getUrl(address))
      .then(res => handleFetchResponse(res))
      .then(json => getOr({}, 'results[0].geometry.location')(json))
      .then(({ lat, lng }) => [lng, lat]))
}

export const getFormattedAddress = address => fetch(getUrl(address))
  .then(res => handleFetchResponse(res))
  .then(json => getOr({}, 'results[0].formatted_address')(json))

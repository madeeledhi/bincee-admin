// libs
import http from 'http'
import https from 'https'
import { promisify } from 'util'

function promisifyNetworkLib(lib) {
  return function getAsync(options) {
    return new Promise((resolve, reject) => {
      lib
        .get(options, response => {
          response.end = new Promise(resolveThis => response.on('end', resolveThis))
          resolve(response)
        })
        .on('error', reject)
    })
  }
}

function isHttps(url) {
  return url.startsWith('https://')
}

http.get[promisify.custom] = promisifyNetworkLib(http)
https.get[promisify.custom] = promisifyNetworkLib(https)

const httpGet = promisify(http.get)
const httpsGet = promisify(https.get)
const get = (options = {}) => {
  const { hostname = '' } = typeof options === 'string' ? { hostname: options } : options

  return isHttps(hostname) ? httpsGet(options) : httpGet(options)
}

export default {
  httpGet,
  httpsGet,
  get,
}

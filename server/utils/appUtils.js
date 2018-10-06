// libs

// src

export const isProduction = () => process.env.NODE_ENV === 'production'

export const isTest = () => process.env.NODE_ENV === 'test'

export const makeLogContextString = req => {
  let strUser
  const { user, headers, connection: { remoteAddress } } = req

  // to get forwarded header, added this line on nginx website config
  // proxy_set_header  X-Forwarded-For $remote_addr;
  const ip = headers['x-forwarded-for'] || remoteAddress

  if (user) {
    strUser = `${user.id} (${user.email})`
  } else {
    strUser = 'Anonymous'
  }

  return `[${strUser}, ${ip}]`
}

export const stringEndsWith = (str, suffix) =>
  str.indexOf(suffix, str.length - suffix.length) !== -1

export const getPort = () => (isProduction() ? (process.env.PORT || 80) : 4000)

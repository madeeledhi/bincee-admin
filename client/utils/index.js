export * from './utils'
export { default as configureRouter } from './configureRouter'
export * from './formValidation'
export * from './getBaseUrl'

export const makeUID = () =>
  '-xxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })

export const makePID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
// export infoDrawer from './infoDrawer'

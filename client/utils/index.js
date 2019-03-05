import XLSX from 'xlsx'

export * from './utils'
export { default as configureRouter } from './configureRouter'
export * from './formValidation'
export * from './getBaseUrl'

export const exportData = (data, name) => {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const newWorkbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(newWorkbook, worksheet, name)
  XLSX.writeFile(newWorkbook, name.concat('.xlsx'))
}

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

import size from 'lodash/fp/size'
import keys from 'lodash/fp/keys'
import reduce from 'lodash/fp/reduce'
import startCase from 'lodash/fp/startCase'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'

function getColumns(grades) {
  const [first] = grades
  return flow(
    keys,
    filter(key => key !== 'grade_id' && key !== 'school_id'),
    reduce((final, key) => {
      const current = first[key]
      return [
        ...final,
        {
          id: key,
          numeric: typeof current === 'number',
          disablePadding: key === 'grade_name',
          label: startCase(key),
        },
      ]
    }, []),
  )(first)
}

function getRows(grades) {
  return grades
}

export default grades => {
  if (size(grades) < 1) {
    return { columns: [], rows: [] }
  }
  const columns = getColumns(grades)
  const rows = getRows(grades)
  return { columns, rows }
}

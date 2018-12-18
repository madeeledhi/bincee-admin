import trim from 'lodash/fp/trim'

export const validate = values => {
  const errors = {}
  const { grade_name, section, grade_section } = values
  if (!trim(grade_name)) {
    errors.grade_name = 'Required'
  }
  if (!trim(section)) {
    errors.section = 'Required'
  }
  if (!trim(grade_section)) {
    errors.grade_section = 'Required'
  }
  return errors
}

export default { validate }

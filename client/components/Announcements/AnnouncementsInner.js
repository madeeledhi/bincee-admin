// lib
import React from 'react'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import map from 'lodash/fp/map'

// src
import Button from '../Button'
import LoadingView from '../LoadingView'
import styles from './AnnouncementsInner.less'
import FilterSelector from '../FilterSelector'

const AnnouncementsInner = ({
  errors,
  disabled,
  studentError,
  handleChange,
  handleChangeAll,
  isLoading,
  students,
  type,
  selectedStudents,
  subject,
  message,
  sendNotification,
  hasAll,
  handleChangeCriteria,
  filterCriteria,
  driversList,
  gradesList,
  shiftsList,
  savedFilters,
  dispatch,
}) => {
  const { isDriver, isGrade, isShift } = filterCriteria
  return (
    <Choose>
      <When condition={!isLoading}>
        <form className={styles.root}>
          <div className={styles.head}>
            <div className={styles.title}>SCHOOL ANNOUNCEMENTS</div>
            <div className={styles.spacer} />
            <Button
              onClick={sendNotification}
              label="Send"
              disabled={disabled}
              style={{ backgroundColor: '#00c6ff', borderColor: '#00c6ff' }}
            />
          </div>
          <div className={styles.rowLeft}>
            <label className={styles.label}>Announcements Options : </label>
            <FormControl component="fieldset">
              {/* <FormLabel component="legend">Gender</FormLabel> */}
              <RadioGroup
                aria-label="Send To"
                value={type}
                className={styles.radioButton}
                onChange={handleChange('type')}
              >
                <FormControlLabel
                  value="school"
                  control={<Radio className={styles.radioButton} />}
                  label="School"
                />
                <FormControlLabel
                  value="student"
                  control={<Radio className={styles.radioButton} />}
                  label="Students"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <If condition={type === 'student'}>
            <div className={styles.row}>
              <label className={styles.label}>Driver : </label>
              <FormControlLabel
                control={
                  <Checkbox
                    classes={{ root: styles.checkBox }}
                    checked={isDriver}
                    onChange={handleChangeCriteria('isDriver')}
                    // value={val}
                    icon={<Icon className={styles.unChecked}>check</Icon>}
                    checkedIcon={
                      <Icon className={styles.checked}>check</Icon>
                    }
                  />
                  // <Checkbox
                  //   checked={isDriver}
                  //   onChange={handleChangeCriteria('isDriver')}
                  // />
                }
                label="Driver"
              />
              {/* <If condition={isDriver}> */}
                <FilterSelector
                  data={driversList}
                  filterName="fullname"
                  filterKey="driver_name"
                  savedFilters={savedFilters}
                  dispatch={dispatch}
                />
              {/* </If> */}
              <label className={styles.label}>Grade : </label>
              <FormControlLabel
                control={
                  // <Checkbox
                  //   checked={isGrade}
                  //   onChange={handleChangeCriteria('isGrade')}
                  // />
                  <Checkbox
                    classes={{ root: styles.checkBox }}
                    checked={isGrade}
                    onChange={handleChangeCriteria('isGrade')}
                    // value={val}
                    icon={<Icon className={styles.unChecked}>check</Icon>}
                    checkedIcon={
                      <Icon className={styles.checked}>check</Icon>
                    }
                  />
                }
                label="Grade"
              />
              {/* <If condition={isGrade}> */}
                <FilterSelector
                  data={gradesList}
                  filterName="grade_section"
                  filterKey="grade_name"
                  savedFilters={savedFilters}
                  dispatch={dispatch}
                />
              {/* </If> */}
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={isShift}
                    onChange={handleChangeCriteria('isShift')}
                  />
                }
                label="Shift"
              />
              <If condition={isShift}>
                <FilterSelector
                  data={shiftsList}
                  filterName="shift_name"
                  savedFilters={savedFilters}
                  dispatch={dispatch}
                />
              </If> */}
            </div>
            <div className={styles.row}>
              <label className={styles.label}>Students : </label>
              <FormControl className={styles.item}>
                {/* <InputLabel htmlFor="select-multiple-chip">
                {'Select Students'}
              </InputLabel> */}
                <Select
                  classes={{ select: styles.select }}
                  error={studentError}
                  helperText={studentError}
                  variant="outlined"
                  multiple
                  // className={{select: styles.find}}
                  value={selectedStudents}
                  onChange={handleChange('selectedStudents')}
                  input={<OutlinedInput id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div>
                      {selected.map(value => {
                        const { fullname } = value
                        return (
                          <Chip
                            key={value}
                            label={fullname}
                            className={styles.chip}
                          />
                        )
                      })}
                    </div>
                  )}
                >
                  <MenuItem key="000" value="all" disableTouchRipple>
                    {/* <Checkbox checked={hasAll} onChange={handleChangeAll} /> */}
                    <Checkbox
                      classes={{ root: styles.checkBox }}
                      checked={hasAll}
                      onChange={handleChangeAll}
                      // value={val}
                      icon={<Icon className={styles.unChecked}>check</Icon>}
                      checkedIcon={
                        <Icon className={styles.checked}>check</Icon>
                      }
                    />
                    <ListItemText primary="All" />
                  </MenuItem>
                  {map(student => {
                    const { id: student_id, parent_id, fullname } = student
                    return (
                      <MenuItem key={student_id} value={student}>
                        <Checkbox
                          classes={{ root: styles.checkBox }}
                          checked={selectedStudents.indexOf(student) > -1}
                          // value={val}
                          icon={<Icon className={styles.unChecked}>check</Icon>}
                          checkedIcon={
                            <Icon className={styles.checked}>check</Icon>
                          }
                        />
                        {/* <Checkbox
                          checked={selectedStudents.indexOf(student) > -1}
                        /> */}
                        <ListItemText primary={fullname} />
                      </MenuItem>
                    )
                  })(students)}
                </Select>
              </FormControl>
            </div>
          </If>
          <div className={styles.row}>
            <label className={styles.label}>Subject : </label>
            <TextField
              id="standard-subject"
              // label="Subject"
              value={subject}
              error={errors.subject}
              helperText={errors.subject}
              onChange={handleChange('subject')}
              margin="normal"
              variant="outlined"
              className={styles.item}
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label}>Message : </label>
            <TextField
              id="standard-message"
              // label="Message"
              multiline
              rowsMax="8"
              rows="8"
              error={errors.message}
              helperText={errors.message}
              value={message}
              onChange={handleChange('message')}
              margin="normal"
              variant="outlined"
              className={styles.item}
            />
          </div>
        </form>
      </When>
      <Otherwise>
        <LoadingView />
      </Otherwise>
    </Choose>
  )
}
export default AnnouncementsInner

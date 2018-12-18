// lib
import React from 'react'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'

// src
import EnhancedTable from '../EnhancedTable'
import CreateStudent from '../CreateStudent'
import EditStudent from '../EditStudent'
import LoadingView from '../LoadingView'

const AnnouncementsInner = ({
  error,
  handleChange,
  isLoading,
  students,
  sendTo,
  selectedStudents,
  subject,
  message,
  sendNotification,
}) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="Send To"
            value={sendTo}
            onChange={handleChange('sendTo')}
          >
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="All Students"
            />
            <FormControlLabel
              value="few"
              control={<Radio />}
              label="few Students"
            />
          </RadioGroup>
        </FormControl>
        <If condition={sendTo === 'few'}>
          <FormControl>
            <InputLabel htmlFor="select-multiple-chip">Students</InputLabel>
            <Select
              multiple
              value={selectedStudents}
              onChange={handleChange('selectedStudents')}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div>
                  {selected.map(value => (
                    <Chip key={value} label={value.fullname} />
                  ))}
                </div>
              )}
            >
              {students.map(student => {
                const { id: student_id, parent_id, fullname } = student
                return (
                  <ListItem key={student_id} value={student}>
                    {fullname}
                  </ListItem>
                )
              })}
            </Select>
          </FormControl>
        </If>
        <TextField
          id="standard-subject"
          label="Subject"
          value={subject}
          onChange={handleChange('subject')}
          margin="normal"
        />
        <TextField
          id="standard-message"
          label="Message"
          multiline
          rowsMax="4"
          value={message}
          onChange={handleChange('message')}
          margin="normal"
        />
        <Button onClick={sendNotification}>Send</Button>
      </div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Announcements'} />
    </Otherwise>
  </Choose>
)
export default AnnouncementsInner

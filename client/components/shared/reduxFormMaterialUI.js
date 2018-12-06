// libs
import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import RadioButtonGroup from '@material-ui/core/RadioGroup'
import SelectField from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

export const renderTextField = ({
  input,
  label,
  inputProps = {},
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    fullWidth
    error={touched && error}
    helperText={touched && error}
    FormHelperTextProps={{ style: { marginTop: 10, alignSelf: 'flex-start' } }}
    InputProps={{
      autoComplete: 'new-password',
      autofill: 'off',
      ...inputProps,
    }}
    {...input}
    {...custom}
  />
)

export const renderCheckbox = ({ input, label, style = {} }) => (
  <FormControlLabel
    label={label}
    control={
      <Checkbox
        color="primary"
        checked={input.value}
        style={style}
        onChange={event => {
          input.onChange(event.target.checked)
        }}
        disableTouchRipple
      />
    }
  />
)

export const renderRadioGroup = ({ input, label, ...rest }) => (
  <div style={{ margin: '10px 0' }}>
    <label style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.298039)' }}>
      {label}
    </label>
    <RadioButtonGroup
      {...input}
      {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  </div>
)

export const renderSelectField = props => {
  const {
    input: { onChange, value, name, ...input },
    meta: { error },
    label,
    children,
    multiple = false,
    ...custom
  } = props

  return (
    <FormControl error={error} fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <SelectField
        inputProps={{ name, id: name }}
        {...input}
        multiple={multiple}
        value={multiple ? [...value] : value}
        onChange={event => onChange(event.target.value)}
        renderValue={selected => (
          <Choose>
            <When condition={multiple}>{selected.join(', ')}</When>
            <Otherwise>{selected}</Otherwise>
          </Choose>
        )}
        style={{ marginTop: 15 }}
        {...custom}
      >
        <Choose>
          <When condition={multiple}>
            {children.map(
              ({ key, props: { value: _value_, children: _children_ } }) => (
                <MenuItem key={key} value={_value_}>
                  <Checkbox
                    color="primary"
                    checked={value.indexOf(_value_) > -1}
                  />
                  <ListItemText primary={_children_} />
                </MenuItem>
              ),
            )}
          </When>
          <Otherwise>{children}</Otherwise>
        </Choose>
      </SelectField>
      <FormHelperText style={{ marginTop: 10 }}>{error}</FormHelperText>
    </FormControl>
  )
}

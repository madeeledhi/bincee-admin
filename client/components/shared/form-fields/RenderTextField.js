//@flow
import * as React from 'react'
import PropTypes from 'prop-types'
import { Input, Form } from 'antd'
import { isEmpty, isNil } from 'ramda'


type Props = {
  input: any,
  meta: any,
  label?: string,
  hintText?: string,
  defaultValue: string,
  type: any,
  fieldWidth: number,
  fieldHeight: number,
  styleType: string,
  readOnly: boolean,
  tooltipPlacement: string,
  isRequired: boolean,
  disabled: boolean,
  id: string
}
const FormItem = Form.Item

export const RenderTextField = ({
  input: { name, value, onChange, onBlur, onFocus },
  meta: { touched, error, warning,  dirty,  visited  },
  label,
  hintText,
  defaultValue,
  type,
  fieldWidth,
  fieldHeight,
  styleType,
  readOnly,
  tooltipPlacement,
  isRequired,
  disabled,
  addonAfterText,
  id
}: Props) => {
  const isLabelExist = !isEmpty(label) && !isNil(label),
    labelProp = isLabelExist
      ? {
          label: (
            <span title={label}>
              {label}
              {isRequired && <RequiredSymbol>*</RequiredSymbol>}
            </span>
          )
        }
      : {}

  return (
    <div className="base-field-container">
      <FormItem
        validateStatus={ visited  && error ? 'error' : ''}
        {...labelProp}
        colon={false}
      >
        <Input
          name={name}
          id={id}
          placeholder={hintText}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={e => {
            onChange(e.target.value)
          }}
          disabled={disabled}
          type={type}
          readOnly={readOnly}
          value={value}
          addonAfter={addonAfterText}
        />

        <If condition={visited && error !== undefined && !isEmpty(value)}>
          <Tooltip title={error} placement={tooltipPlacement} visible={true} />
        </If>
      </FormItem>
    </div>
  )
}

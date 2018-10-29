// libs
import React, { Component } from 'react'
import { Field, getFormValues, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

// src
import {RenderTextField} from '../shared/form-fields'
import {LoginButton} from '../shared/buttons/loginButton'
import style from './styles.less'

class app extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={style.header}>
        <div className={style.loginFields}>
          <Field
            id={'userName'}
            name={'userName'}
            component={RenderTextField}
            label="User Name"
            disabled={false}
          />
          <Field
            id={'pass'}
            name={'pass'}
            component={RenderTextField}
            type={'password'}
            label="password"
            disabled={false}
          />
          <LoginButton />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    formValues: getFormValues('login')(state)
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'login',
    enableReinitialize: true,
    initialValues: {
      userName: '',
      pass: ''
    }
  })(app)
)

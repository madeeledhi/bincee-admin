// // lib
// import React from 'react'

// const ShiftsAndTimings = ({}) => <div>i am ShiftsAndTimings</div>
// export default ShiftsAndTimings
// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'
import { push } from 'react-router-redux'

// src
import { hasPropChanged } from '../../utils'
import { loadShifts } from '../../actions'
import {
  renderTextField
} from '../shared/reduxFormMaterialUI'
import styles from './ShiftsAndTimings.less'

class ShiftsAndTimings extends React.Component {
  state = { error: '', isLoading: true }

  // componentDidMount() {
  //   const { dispatch, user } = this.props
  //   if (user) {
  //     const { token } = user
  //     dispatch(loadShifts({ token })).then(() => {
  //       this.setState(() => ({ isLoading: false }))
  //     })
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user', 'shifts'], this.props, nextProps)) {
      const { dispatch, user, shifts, error } = nextProps
      const { token } = user
      if (size(shifts) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadShifts({ token })).then(() => {
          this.setState(() => ({ isLoading: false }))
        })
      } else {
        this.setState(() => ({ error, isLoading: false }))
      }
    }
  }


  render() {
    const { error, isLoading } = this.state
    const { shifts } = this.props
    const { columns: rows, rows: data } = shifts

    return (
      <div>
        <div className={styles.root}>
          <div className={styles.row}>
            <Field
              id="shift_id"
              name="shift_id"
              component={renderTextField}
              label="Shift ID"
              disabled={true}
              variant="outlined"
              className={styles.item}
            />
          </div>
          <div className={styles.row}>
            <Field
              id="start_time"
              name="start_time"
              component={renderTextField}
              label="Start Time"
              disabled={false}
              variant="outlined"
              className={styles.item}
            />
          </div>
          <div className={styles.row}>
            <Field
              id="end_time"
              name="end_time"
              component={renderTextField}
              label="End Time"
              disabled={false}
              variant="outlined"
              className={styles.item}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const shifts = getOr({}, 'shifts')(state)
  const user = getOr({}, 'user')(state)
  const error = getOr('', 'message')(shifts)
  return { shifts: user, error }

}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'shifts',
    initialValues: {
      shift_id: '',
      start_time: '',
      end_time: '',

    },
  })(ShiftsAndTimings),
)

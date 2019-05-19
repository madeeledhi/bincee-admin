// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src

import { hasPropChanged } from '../../utils'
import LicencesInner from './LicencesInner'

class Licences extends React.Component {
  state = { error: '', isLoading: true }

  componentDidMount() {
    const { dispatch, user } = this.props
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user'], this.props, nextProps)) {
    }
  }

  render() {
    return <LicencesInner />
  }
}

const mapStateToProps = state => {
  const user = getOr({}, 'user')(state)

  return { user }
}
export default connect(mapStateToProps)(Licences)

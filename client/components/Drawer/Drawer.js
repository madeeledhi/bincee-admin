import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import map from 'lodash/fp/map'
import keys from 'lodash/fp/keys'
import has from 'lodash/fp/has'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import startCase from 'lodash/fp/startCase'

// src
import styles from './Drawer.less'

const Drawer = ({ data }) => {
  const headings = keys(data)
  return (
    <div className={styles.main}>
      {map(heading => {
        const current = data[heading]
        const hasPhoto = has('photo')(current)
        const currentKeys = flow(
          keys,
          filter(key => key !== 'photo'),
        )(current)
        return (
          <div className={styles.divider}>
            <h4 className={styles.heading}>{startCase(heading)}</h4>
            {hasPhoto && (
              <Avatar
                alt="Remy Sharp"
                src={current.photo || '/images/profile.png'}
                className={styles.avatar}
              />
            )}
            {map(key => {
              const currentValue = current[key]
              return (
                <div className={styles.keyConainer}>
                  <label className={styles.label}>{startCase(key)} :</label>
                  <span className={styles.keyValue}>{currentValue}</span>
                </div>
              )
            })(currentKeys)}
          </div>
        )
      })(headings)}
    </div>
  )
}
export default Drawer

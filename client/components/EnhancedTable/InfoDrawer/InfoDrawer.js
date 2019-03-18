// libs
import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

//  src
import styles from './shared.less'
import DrawerContent from '../DrawerContent'
import LoadingView from '../../LoadingView'

class InfoDrawer extends React.Component {
  render() {
    const {
      dataIsAvailable,
      enableDrawer,
      drawerTitle,
      handleDrawerClose,
      openDrawer,
    } = this.props
    return (
      <If condition={enableDrawer}>
        <ClickAwayListener onClickAway={handleDrawerClose}>
          <React.Fragment>
            <Drawer
              anchor="right"
              open={openDrawer}
              onClose={handleDrawerClose}
              classes={{ paper: styles.drawer }}
              variant="persistent"
            >
              <div className={styles.drawerHeader}>
                <div className={styles.headerAction}>
                  <IconButton onClick={handleDrawerClose}>
                    <Icon className={styles.arrowIcon}>{'arrow_forward'}</Icon>
                  </IconButton>
                </div>
                <div className={styles.label}>
                  <label>{drawerTitle}</label>
                </div>
              </div>
              <Divider />
              <div style={{ width: 250 }}>
                <Choose>
                  <When condition={dataIsAvailable}>
                    <DrawerContent {...this.props} />
                  </When>
                  <Otherwise>
                    <LoadingView />
                  </Otherwise>
                </Choose>
              </div>
            </Drawer>
          </React.Fragment>
        </ClickAwayListener>
      </If>
    )
  }
}

export default InfoDrawer

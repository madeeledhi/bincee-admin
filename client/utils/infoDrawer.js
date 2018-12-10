// libs
import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'

/**
 * A higher order function that triggers a drawer
 * on a function call.
 * Useful for displaying any react component in drawer.
 */

export default (options = {}) => WrappedComponent => {
  const { style = {}, classes = {} } = options
  return class InfoDialog extends React.Component {
    state = {
      open: false,
      anchor: 'right',
      content: null,
    }

    handleRequestClose = () => {
      this.setState({ open: false })
    }

    triggerDrawer = args => {
      this.setState(() => ({ ...args, open: true }))
    }

    render() {
      const { open, anchor, content, title } = this.state
      return (
        <React.Fragment>
          <Drawer
            anchor={anchor}
            open={open}
            onClose={this.handleRequestClose}
            style={style}
            classes={classes.drawer}
            variant="persistent"
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleRequestClose}>
                <Icon>{'arrow_forward'}</Icon>
              </IconButton>
              <h4 style={style}>{title}</h4>
            </div>
            <Divider />
            <div style={{ width: 240 }}>{content}</div>
          </Drawer>
          <WrappedComponent
            {...this.props}
            triggerDrawer={this.triggerDrawer}
            onDrawerClose={this.handleRequestClose}
          />
        </React.Fragment>
      )
    }
  }
}

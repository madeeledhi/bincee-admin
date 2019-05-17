import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class TrialReminder extends React.Component {
  state = {
    open: false,
  }

  componentDidMount() {
    this.setState({ open: true })
  }

  handleClose = isTrialExpired => {
    this.setState({ open: isTrialExpired })
  }

  render() {
    const { trialDetails, onClickSignout } = this.props
    const { expirationDate, RemainingDays, isTrialExpired } = trialDetails
    const { open } = this.state
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={() => this.handleClose(isTrialExpired)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{}}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {isTrialExpired
            ? `Trail Expired ${Math.abs(RemainingDays)} ago.`
            : `${RemainingDays} Days Remain in trial`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Trial expire${isTrialExpired ? 'd' : ''} on ${expirationDate}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickSignout} color="primary">
            SignOut
          </Button>
          <Button
            disabled={isTrialExpired}
            onClick={() => this.handleClose(isTrialExpired)}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default TrialReminder

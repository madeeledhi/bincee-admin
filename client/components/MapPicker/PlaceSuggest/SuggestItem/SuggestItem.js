//lib
import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

//src
import styles from './SuggestItem.less'

class SuggestItem extends React.Component {
  onClick = event => {
    const { suggest, onSelect } = this.props
    event.preventDefault()
    onSelect(suggest)
  }

  render() {
    const { onMouseDown, onMouseOut, suggest } = this.props
    return (
      <ListItem
        className={styles.root}
        onMouseDown={onMouseDown}
        onMouseOut={onMouseOut}
        onClick={this.onClick}
      >
        <ListItemText primary={suggest.label} />
      </ListItem>
    )
  }
}
export default SuggestItem

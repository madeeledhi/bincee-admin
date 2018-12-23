//libs
import React from 'react'
import List from '@material-ui/core/List'

//src
import SuggestItem from '../SuggestItem'
import { hasPropChanged } from '../../../../utils'

export default class SuggestList extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['suggests'], this.props, nextProps)) {
      const { suggests } = nextProps
      if (suggests.length === 0) {
        this.props.onSuggestNoResults()
      }
    }
  }

  render() {
    const { suggests, onSuggestMouseDown, onSuggestSelect, width } = this.props
    return (
      <List>
        {suggests.map(suggest => (
          <SuggestItem
            width={width}
            key={suggest.placeId}
            suggest={suggest}
            onMouseDown={onSuggestMouseDown}
            onMouseOut={onSuggestMouseDown}
            onSelect={onSuggestSelect}
          />
        ))}
      </List>
    )
  }
}

import React from 'react'
import size from 'lodash/fp/size'
import MapGL, { Marker, Popup } from 'react-map-gl'

// src
import BusPin from '../BusPin/BusPin'
import MarkerInfo from '../MarkerInfo/MarkerInfo'
import { formatLatLngArray, getViewPort } from '../Utils'
import { hasPropChanged } from '../../../utils'

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZmluZHhhaW4iLCJhIjoiY2pxOTY1bjY3MTMwYjQzbDEwN3h2aTdsbCJ9.fKLD1_UzlMIWhXfUZ3aRYQ' // Set your mapbox token here

function getWidth() {
  return (window.innerWidth - (window.innerWidth * 18) / 100) / 2
}
class FleetMap extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
    console.log(this.textInput, window.innerWidth)
    this.state = {
      popupInfo: null,
    }
  }

  componentDidMount() {
    const { drivers } = this.props
    const value = formatLatLngArray(drivers)
    if (size(value) > 0) {
      const viewport = getViewPort(value)
      this.setState(() => ({ viewport }))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['drivers'], this.props, nextProps)) {
      const { drivers: preDrivers } = this.props
      if (size(preDrivers) < 1) {
        const { drivers } = nextProps
        const value = formatLatLngArray(drivers)
        const viewport = getViewPort(value)
        this.setState(() => ({ viewport }))
      }
    }
  }

  onViewportChange = viewport => this.setState({ viewport })

  renderCityMarker = (bus, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={bus.longitude}
        latitude={bus.latitude}
      >
        <BusPin
          size={20}
          onClick={() => this.setState(() => ({ popupInfo: bus }))}
        />
      </Marker>
    )
  }

  renderPopup() {
    const { popupInfo } = this.state

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          offset={[0, -100]}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <MarkerInfo info={popupInfo} />
        </Popup>
      )
    )
  }

  render() {
    const { viewport } = this.state
    const { drivers } = this.props

    return (
      <MapGL
        {...viewport}
        width={getWidth()}
        height={500}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        onViewportChange={this.onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {drivers.map(this.renderCityMarker)}
        {this.renderPopup()}
      </MapGL>
    )
  }
}

export default FleetMap

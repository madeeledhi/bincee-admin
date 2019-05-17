import React from 'react'
import MapGL, { Marker, Popup } from 'react-map-gl'
import WebMercatorViewport from 'viewport-mercator-project'
import BusPin from './BusPin/BusPin'
import MarkerInfo from './MarkerInfo/MarkerInfo'
import formatLatLngArray from './Utils'

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZmluZHhhaW4iLCJhIjoiY2pxOTY1bjY3MTMwYjQzbDEwN3h2aTdsbCJ9.fKLD1_UzlMIWhXfUZ3aRYQ' // Set your mapbox token here

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10,
}

const Data = [
  {
    driverName: 'Qasmi',
    busNo: 'LOC3479',
    latitude: 33.643398,
    longitude: 73.108649,
  },
  {
    driverName: 'Zuraiz',
    busNo: 'LOC3480',
    latitude: 33.71828,
    longitude: 73.037238,
  },
  {
    driverName: 'Gul',
    busNo: 'LOC3481',
    latitude: 33.720797,
    longitude: 73.0305,
  },
  {
    driverName: 'Osman',
    busNo: 'LOC3483',
    latitude: 33.714256,
    longitude: 73.08363,
  },
]

export default class FleetTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: 37.8,
        longitude: 96,
        zoom: 3,
        bearing: 0,
        pitch: 0,
      },
      popupInfo: null,
    }
  }

  componentDidMount() {
    const value = formatLatLngArray(Data)
    const viewport = new WebMercatorViewport({
      width: 800,
      height: 600,
    }).fitBounds(value, {
      padding: 10,
      offset: [0, -100],
    })
    this.setState(() => ({ viewport }))
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

    return (
      <MapGL
        {...viewport}
        width={800}
        height={600}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this.onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {Data.map(this.renderCityMarker)}
        {this.renderPopup()}
      </MapGL>
    )
  }
}

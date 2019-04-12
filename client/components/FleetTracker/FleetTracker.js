import React from 'react'
import MapGL, { GeolocateControl, Marker } from 'react-map-gl'
import BusPin from './BusPin/BusPin'

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZmluZHhhaW4iLCJhIjoiY2pxOTY1bjY3MTMwYjQzbDEwN3h2aTdsbCJ9.fKLD1_UzlMIWhXfUZ3aRYQ' // Set your mapbox token here

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10,
}

export default class FleetTracker extends React.Component {
  state = {
    viewport: {
      latitude: 37.8,
      longitude: 96,
      zoom: 3,
      bearing: 0,
      pitch: 0,
    },
  }

  onViewportChange = viewport => this.setState({ viewport })

  render() {
    const { viewport } = this.state

    return (
      <MapGL
        {...viewport}
        width={1000}
        height={700}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this.onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {/* <GeolocateControl
          style={geolocateStyle}
          onViewportChange={this.onViewportChange}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
        /> */}
        {
          <Marker key={`marker-232323`} longitude={73.0479} latitude={33.6844}>
            <BusPin size={20} />
          </Marker>
        }
      </MapGL>
    )
  }
}

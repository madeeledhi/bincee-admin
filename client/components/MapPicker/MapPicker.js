import React from 'react'
import Map from './Map'

const google = window.google

const DEFAULT_RADIUS = 1000
const DEFAULT_ZOOM = 10

const DEFAULT_CIRCLE_OPTIONS = {
  fillColor: 'red',
  fillOpacity: 0.2,
  strokeColor: 'red',
  strokeOpacity: 1,
  strokeWeight: 1.2,
}

class LocationPicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      position: props.defaultPosition,
      shouldRecenterMap: false,
    }

    this.handleMarkerDragEnd = this.handleMarkerDragEnd.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { defaultPosition } = nextProps
    if (
      JSON.stringify(defaultPosition) !==
      JSON.stringify(this.props.defaultPosition)
    ) {
      this.setState(
        { position: defaultPosition, shouldRecenterMap: true },
        () => {
          // Reverse geocode new default position
          this.geocodePosition(defaultPosition)
            .then(places => {
              this.notify(defaultPosition, places)
            })
            .catch(err => {
              console.error(err)
              this.notify(defaultPosition, [])
            })
        },
      )
    }
  }

  notify(position, places) {
    const { onChange } = this.props
    const location = {
      position,
      places,
      address: places.length > 0 ? places[0].formatted_address : '',
    }
    onChange && onChange(location)
  }

  handleMarkerDragEnd(mouseEvent) {
    const { onChange } = this.props
    const lat = mouseEvent.latLng.lat()
    const lng = mouseEvent.latLng.lng()
    const position = { lat, lng }
    this.setState({ position, shouldRecenterMap: false })
    this.geocodePosition(position)
      .then(places => {
        this.notify(position, places)
      })
      .catch(err => {
        console.error(err)
        this.notify(position, [])
      })
  }

  geocodePosition(position) {
    const geocoder = new google.maps.Geocoder()
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          resolve(results)
        } else {
          reject(status)
        }
      })
    })
  }

  render() {
    const {
      zoom,
      radius,
      circleOptions,
      containerElement,
      mapElement,
    } = this.props

    const { position, shouldRecenterMap } = this.state

    return (
      <Map
        containerElement={containerElement}
        mapElement={mapElement}
        handleMarkerDragEnd={this.handleMarkerDragEnd}
        position={position}
        circleOptions={circleOptions}
        radius={radius}
        defaultZoom={zoom}
        shouldRecenterMap={shouldRecenterMap}
      />
    )
  }
}

export default LocationPicker

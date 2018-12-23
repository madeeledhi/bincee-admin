import React from 'react'
import Map from './Map'
import PlaceSuggest from './PlaceSuggest/PlaceSuggest'
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
const fixtures = [
  { label: 'New York', location: { lat: 40.7033127, lng: -73.979681 } },
  { label: 'Rio', location: { lat: -22.066452, lng: -42.9232368 } },
  { label: 'Tokyo', location: { lat: 35.673343, lng: 139.710388 } },
]

class LocationPicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      position: props.defaultPosition,
      shouldRecenterMap: false,
    }

    this.handleMarkerDragEnd = this.handleMarkerDragEnd.bind(this)
    this.handleSuggestSelect = this.handleSuggestSelect.bind(this)
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
  handleSuggestSelect(suggest) {
    const { location } = suggest
    const position = location
    const { onChange } = this.props
    this.setState({ position, shouldRecenterMap: true })
    this.geocodePosition(position)
      .then(places => {
        this.notify(position, places)
      })
      .catch(err => {
        console.error(err)
        this.notify(position, [])
      })
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
    const google = window.google
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
      <div>
        <PlaceSuggest
          fixtures={fixtures}
          onSuggestSelect={this.handleSuggestSelect}
        />
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
      </div>
    )
  }
}

export default LocationPicker

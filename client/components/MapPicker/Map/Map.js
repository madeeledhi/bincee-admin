import React from 'react'
import withGoogleMap from 'react-google-maps/lib/withGoogleMap'
import GoogleMap from 'react-google-maps/lib/components/GoogleMap'
import Marker from 'react-google-maps/lib/components/Marker'
import Circle from 'react-google-maps/lib/components/Circle'
import PlaceSuggest from '../PlaceSuggest/PlaceSuggest'

const Map = withGoogleMap(props => {
  const {
    position,
    defaultZoom,
    handleMarkerDragEnd,
    onZoomChanged,
    radius,
    circleOptions,
    shouldRecenterMap,
  } = props

  const circle =
    radius !== -1 ? (
      <Circle center={position} radius={radius} options={circleOptions} />
    ) : null
  const mapExtraProps = shouldRecenterMap ? { center: position } : {}

  return (
    <GoogleMap
      onZoomChanged={onZoomChanged}
      defaultZoom={defaultZoom}
      defaultCenter={position}
      {...mapExtraProps}
    >
      <Marker draggable position={position} onDragEnd={handleMarkerDragEnd} />
      {circle}
    </GoogleMap>
  )
})

export default Map

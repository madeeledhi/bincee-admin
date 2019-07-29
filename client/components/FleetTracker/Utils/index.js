/* eslint-disable indent */
//  libs
import map from 'lodash/fp/map'
import size from 'lodash/fp/size'
import WebMercatorViewport from 'viewport-mercator-project'

export function formatLatLngArray(data) {
  return map(({ latitude, longitude }) => [longitude, latitude])(data)
}

export function getViewPort(points) {
  return size(points) > 1
    ? new WebMercatorViewport({
        width: 800,
        height: 600,
      }).fitBounds(points, {
        padding: 0,
        offset: [170, 130],
      })
    : {
        latitude: points[0][1],
        longitude: points[0][0],
        zoom: 15,
        bearing: 0,
        pitch: 0,
      }
}

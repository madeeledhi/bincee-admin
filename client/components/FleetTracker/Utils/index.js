import map from 'lodash/fp/map'

export default function formatLatLngArray(data) {
  return map(({ latitude, longitude }) => [longitude, latitude])(data)
}

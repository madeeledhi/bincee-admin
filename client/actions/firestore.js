// src

export const SYNC_RIDES = 'SYNC_RIDES'
export const SYNC_DRIVERS = 'SYNC_DRIVERS'

export const syncRides = rides => ({
  type: SYNC_RIDES,
  payload: rides,
})

export const syncDrivers = drivers => ({
  type: SYNC_DRIVERS,
  payload: drivers,
})

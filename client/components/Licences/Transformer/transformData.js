import size from 'lodash/fp/size'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'

export default function transformData(user, userDetails, students, drivers) {
  const isValid =
    size(user) > 0 &&
    size(userDetails) > 0 &&
    size(students) > 0 &&
    size(drivers) > 0
  if (isValid) {
    const { licenses, fleetLicenses } = userDetails
    const activeStudents = size(students)
    const InactiveStudents = licenses - activeStudents
    const activeDrivers = flow(
      filter(({ enableFleet }) => enableFleet),
      size,
    )(drivers)
    const InactiveDrivers = fleetLicenses - activeDrivers

    return [
      {
        Total: licenses,
        Active: activeStudents,
        Inactive: InactiveStudents,
        Title: 'App Licences',
      },
      {
        Total: fleetLicenses,
        Active: activeDrivers,
        Inactive: InactiveDrivers,
        Title: 'Fleet Licences',
      },
    ]
  }
  console.log(user, userDetails, students, drivers)
  return [
    { Total: 0, Active: 0, Inactive: 0, Title: 'App Licences' },
    { Total: 0, Active: 0, Inactive: 0, Title: 'Fleet Licences' },
  ]
}

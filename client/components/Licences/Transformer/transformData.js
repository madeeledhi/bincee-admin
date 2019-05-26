import size from 'lodash/fp/size'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import round from 'lodash/fp/round'
import moment from 'moment'

const possibleFormat = ['DD-MMM-YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY']

function getTrialInfo(date, limit = 0, isTrialUser = false) {
  const expireDate = moment(date, possibleFormat).add(limit, 'days')
  const currentDate = moment(new Date(), possibleFormat)
  const hours = expireDate.diff(currentDate, 'hours')
  const remainingHour = hours % 24
  const remainingDays = round(hours / 24)

  return {
    remainingDays,
    remainingHour,
    isTrialUser,
  }
}
export default function transformData(user, userDetails, students, drivers) {
  const isValid =
    size(user) > 0 &&
    size(userDetails) > 0 &&
    size(students) > 0 &&
    size(drivers) > 0
  if (isValid) {
    const { licenses, fleetLicenses, trial, trialDate, trialDays } = userDetails
    const trialInfo = getTrialInfo(trialDate, trialDays, trial)
    const activeStudents = size(students)
    const InactiveStudents = licenses - activeStudents
    const activeDrivers = flow(
      filter(({ enableFleet }) => enableFleet),
      size,
    )(drivers)
    const InactiveDrivers = fleetLicenses - activeDrivers

    return {
      trialInfo,
      licenceInfo: [
        {
          total: licenses,
          active: activeStudents,
          inactive: InactiveStudents,
          title: 'App Licences',
        },
        {
          total: fleetLicenses,
          active: activeDrivers,
          inactive: InactiveDrivers,
          title: 'Fleet Licences',
        },
      ],
    }
  }
  return {
    trialInfo: {},
    licenceInfo: [
      { total: 0, active: 0, inactive: 0, title: 'App Licences' },
      { total: 0, active: 0, inactive: 0, title: 'Fleet Licences' },
    ],
  }
}

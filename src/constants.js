import moment from 'moment'

export const ChapterRouteIndex = { to:'/', label: 'ChapterRouteIndex'}
export const ChapterRouteCountryOfMigration = { to:'/a-country-of-migration', label: 'ChapterRouteCountryOfMigration'}
export const ChapterRouteFamily = { to:'/family', label: 'ChapterRouteFamily'}

export const ChapterRoutesWithIndex = [
  ChapterRouteIndex,
  ChapterRouteCountryOfMigration,
  ChapterRouteFamily
]

export const ChapterRoutes = [
  ChapterRouteCountryOfMigration,
  ChapterRouteFamily
]

export const StartYear = 1839
export const EndYear = (new Date()).getFullYear()
export const StartDate = moment(StartYear, 'YYYY').startOf('year')
export const EndDate = moment(EndYear, 'YYYY').endOf('year')

export const StatusIdle = 'IDLE'
export const StatusFetching = 'FETCHING'
export const StatusSuccess = 'OK'
export const StatusError = 'ERR'
export const StatusNone = 'NONE'

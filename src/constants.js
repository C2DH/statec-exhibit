import moment from 'moment'
import { isMobile, isTablet } from 'react-device-detect';
export const isMobileWithTablet = isMobile
  ? isTablet
    ? window.innerWidth < window.innerHeight
      ? true
      : false
    : true
  : false;
export const isMobileC = isMobile ? true : false;
export const isTabletC = isTablet ? true : false;

export const red = '#d03a45';

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

export const StartYear = 1840
export const EndYear = 2014
export const StartDate = moment(StartYear, 'YYYY').startOf('year')
export const EndDate = moment(EndYear, 'YYYY').endOf('year')

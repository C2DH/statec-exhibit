import moment from 'moment'

export const ChapterRouteIndex = { to:'/', label: 'ChapterRouteIndex', favicon: 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAACdwP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}
export const ChapterRouteCountryOfMigration = { to:'/a-country-of-migration', title:'Un pays de migrations', label: 'ChapterRouteCountryOfMigration', favicon: 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAADt6L8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  sections: [
    'Une croissance démographique exceptionnelle sur le long terme.',
    'Une histoire à deux variables?',
    'Une histoire à trois variables!',
    'Un pays de migrations multiples'
  ]
}
export const ChapterRouteFamily = { to:'/family', label: 'ChapterRouteFamily', title:'Famille et ménage', favicon: 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAADI67QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
sections: [
  'La natalité en recul sur le long terme',
  'Mariages',
  'Divorces',
  'Composition de ménages',
  'Espérance de vie et vieillissement'
]}

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

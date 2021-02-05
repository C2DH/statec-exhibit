import React from 'react'
import {Spring} from 'react-spring/renderprops'
import { useTranslation } from 'react-i18next'
import { ChapterRoutes } from '../../constants'


const ChapterHeader = React.memo(({ chapterIndex = 1 }) => {
  const { t } = useTranslation()
  const route = ChapterRoutes[chapterIndex - 1]

  return <div className="ChapterHeader tc" style={{
    position: 'sticky', top: 0, lineHeight: '50px'
  }}>
    <Spring reset from={{
      opacity: 0,
    }} to={{
      opacity: 1,
    }}>
    {props => <div style={props}>{t(route.label)}</div>}
    </Spring>
  </div>
})

export default ChapterHeader

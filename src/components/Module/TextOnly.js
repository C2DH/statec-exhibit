import React from 'react'

const TextOnly = ({
  module, progress=0,
  startDate, endDate, scaleX
}) => {
  return (
    <div
      className="textContainer w-100 h-100 flex flex-column"
      style={{
        paddingRight: '15px',
      }}
    >
      <h2 className="textContainerTitle">{module.title}</h2>
      <div className="textContainerSubTitle" dangerouslySetInnerHTML={{
        __html: module.subheading,
      }}/>
    </div>
  )
}

export default TextOnly

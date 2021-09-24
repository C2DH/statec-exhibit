import React from 'react'

const ChapterQrCode = ({ isMobileWithTablet, chapterIndex, ...rest }) => {
  if (isMobileWithTablet) {
    return null
  }
  return (
    <div className="ChapterQrCode" {...rest}>
      <img src={`/qrcode-${chapterIndex}.png`} alt='qr code'/>
    </div>
  )
}

export default ChapterQrCode

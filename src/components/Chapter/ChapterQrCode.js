import React from 'react'

const ChapterQrCode = ({ isMobileWithTablet, chapterId, ...rest }) => {
  if (isMobileWithTablet) {
    return null
  }
  return (
    <div className="ChapterQrCode" {...rest}>
      <img src={`/qrcode-${chapterId}.svg`} alt='qr code' className="h-100 w-100"/>
    </div>
  )
}

export default ChapterQrCode

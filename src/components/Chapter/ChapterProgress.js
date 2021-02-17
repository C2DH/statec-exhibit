import React from 'react'
import { useTranslation } from 'react-i18next'


const ChapterProgress = ({ themeId, steps, currentStep, progress}) => {
  const { t } = useTranslation()

  const handleClick = (index) => {
    const hash = `${themeId}-m${index}`
    window.location.hash = hash
    console.info('ohloaooaoa', hash)
  }

  return (
    <div className="ChapterProgress fixed inline-flex flex-column justify-center h-100" style={{
      top: 0,
      left: 0
    }}>
      {steps.map((d,i) => (
        <div key={i} onClick={() => handleClick(i)} className={`relative
          ChapterProgress_step
          ${currentStep === i && 'active'}
          ${currentStep > i && 'done'}
        `}>
          {currentStep === i && (
            <div className="absolute ChapterProgress_step_label">{t('number', {
              n: progress*100
            })}%</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ChapterProgress

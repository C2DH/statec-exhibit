import React from 'react'
import { useTranslation } from 'react-i18next'


const ChapterProgress = ({ themeId, steps, currentStep, progress}) => {
  const { t } = useTranslation()

  const handleClick = (index) => {
    const hash = `${themeId}-m${index}`
    window.location.hash = hash
    console.info('ohloaooaoa', hash)
  }

  const isHidden =(progress === 0 && currentStep < 1) || (progress=== 1 && currentStep === steps.length -1)

  return (<>
    <div className="ChapterProgress fixed inline-flex flex-column justify-center h-100" style={{
      top: 0,
      left: 0,
    }}>
      {steps.map((d,i) => (
        <div key={i} onClick={() => handleClick(i)} className={`relative
          ChapterProgress_step
          ${currentStep === i ? 'active' : ''}
          ${currentStep > i ? 'done': ''}
        `}>
          {currentStep === i && (
            <div className="absolute ChapterProgress_step_label">{t('number', {
              n: progress*100
            })}%</div>
          )}
        </div>
      ))}
    </div>
    <div className="fixed ChapterProgress_titleWrapper" style={{
      left: 0,
      right: 0,
      bottom: 'var(--spacer-2)',
      opacity: isHidden? 0: 1,
      height: 'var(--spacer-6)',
      transform: `translate(${-currentStep*50 + 25}%, 0)`,
    }}>
    {steps.map((d,i) => (
      <div key={i} onClick={() => handleClick(i)} className={`
        ChapterProgress_title absolute w-50 tc
        ${currentStep === i ? 'active' : ''}
        `} style={{
        left: `${50 * i}%`,
      }}>
        {d.title}
      </div>
    ))}
    </div>
    </>
  )
}

export default ChapterProgress

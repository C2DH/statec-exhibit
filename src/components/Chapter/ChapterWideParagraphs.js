import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';

const ChapterWideParagraphs= ({ paragraphs=[], prefix='', height=200 }) => {
  const [step, setStep] = useState({
    idx: -1,
    direction: 'down'
  })

  const onStepEnter = ({ direction, data }) => {
    setStep({
      direction,
      idx: data
    })
  };

  return (
    <div className="ChapterWideParagraphs">
      <Scrollama
        onStepEnter={onStepEnter}
      >
      {paragraphs.map(({ text }, i) => (
        <Step data={i} key={i}>
          <div id={`${prefix}-${i}`}
            className="ChapterWideParagraphs_text tc"
            style={{
              paddingTop: height/6,
              paddingBottom: height/6,
              willChange: 'opacity',
              transition: 'opacity .5s ease-in-out',
              opacity: step.idx === i? 1: 0.1
            }}
          >
            <div className="textContainerSubTitle" dangerouslySetInnerHTML={{
              __html: text,
            }}/>
          </div>
        </Step>
      ))}
      </Scrollama>
    </div>
  )
}

export default ChapterWideParagraphs;

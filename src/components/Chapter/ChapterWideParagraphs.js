import React, { useEffect } from 'react'
// import { Scrollama, Step } from 'react-scrollama'
import { useOnScreen } from '../../hooks'


const ChapterWideParagraph= ({ step, children, height, style, onIntersecting, ...rest }) => {
  const [{ isIntersecting}, ref] = useOnScreen({
    rootMargin: '-50% 0px -50% 0px',
  })
  useEffect(() => {
    if (typeof onIntersecting === 'function') {
      onIntersecting(step, isIntersecting)
    }
  }, [isIntersecting, onIntersecting, step])
  return (
    <div className="ChapterWideParagraph" ref={ref}  {...rest}>
      <div style={{
        ...style,
        opacity: isIntersecting ? 1: 0.1,
        // transform: `translate(0, ${isIntersecting ? '0': height/6 + 'px'}`
      }}>
      {children}
      </div>
    </div>
  )
}

const ChapterWideParagraphs= ({
  paragraphs=[],
  prefix='',
  height=200
}) => {
  const onIntersectingHandler = (step, isIntersecting) => {
    console.debug('[ChapterWideParagraphs] @onIntersectingHandler', step, isIntersecting)
  }
  console.debug('[ChapterWideParagraphs] @render')
  return (
    <div className="ChapterWideParagraphs">
      {paragraphs.map(({ text }, i) => (
        <ChapterWideParagraph className="ChapterWideParagraphs_text tc"
          key={i}
          id={`${prefix}-${i}`}
          step={i}
          style={{
            paddingTop: height/6,
            paddingBottom: height/6,
            willChange: 'opacity, transform',
            transition: 'opacity .6s ease-in, transform .6s ease-out',
          }}
          height={height}
          onIntersecting={onIntersectingHandler}
        >
          <div className="textContainerSubTitle"
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          />
        </ChapterWideParagraph>
      ))}
    </div>
  )
}

//
// const ExChapterWideParagraphs= ({ paragraphs=[], prefix='', height=200 }) => {
//   const [step, setStep] = useState({
//     idx: -1,
//     direction: 'down'
//   })
//
//   const onStepEnter = ({ direction, data }) => {
//     setStep({
//       direction,
//       idx: data
//     })
//   };
//
//   return (
//     <div className="ChapterWideParagraphs">
//       <Scrollama
//         onStepEnter={onStepEnter}
//       >
//       {paragraphs.map(({ text }, i) => (
//         <Step data={i} key={i}>
//           <div id={`${prefix}-${i}`}
//             className="ChapterWideParagraphs_text tc"
//             style={{
//               paddingTop: height/6,
//               paddingBottom: height/6,
//               willChange: 'opacity',
//               transition: 'opacity .5s ease-in-out',
//               opacity: step.idx === i? 1: 0.1
//             }}
//           >
//             &nbsp;
//             <div className="textContainerSubTitle" dangerouslySetInnerHTML={{
//               __html: text,
//             }}/>
//           </div>
//         </Step>
//       ))}
//       </Scrollama>
//     </div>
//   )
// }

export default ChapterWideParagraphs;

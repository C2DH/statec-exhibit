import React from 'react'
import moment from 'moment'
import { StartDate, EndDate } from '../../constants'
import { scaleTime } from 'd3-scale'
import TrendAxisBottomGraphics from '../Trend/TrendAxisBottomGraphics'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'


const Timeline = ({
  themeDatasetId='themeDatasetId',
  paragraphId='-1,-1',
  legend={},
  data=[],
  dateExtent=[StartDate, EndDate],
  from, to,
  height = 100,
  width=100,
  marginLeft=100,
  marginRight=50,
  marginTop=50,
  themeBackgroundColor='var(--primary)',
  ...rest
}) => {
  const svgWidth = width - marginLeft - marginRight
  // convert ms to years
  const yearSpans = parseInt(EndDate - StartDate, 10) / 31556952000
  const yearWidth = 15
  const range = [0, Math.max(width, yearWidth * yearSpans)]
  const zoomedOutscaleX = scaleTime()
      .domain(dateExtent)
      // - marginLeft*2 to accomodate for the left and right axis
      .range([0, width - marginLeft - marginRight])
  const scaleX = scaleTime()
      .clamp(true)
      .domain(dateExtent)
      .range(range)

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y:0 }))
  const bind = useDrag(
    ({ down, offset: [mx, my] }) => {
      api.start({ x: mx, y:my })
    },
  )

  React.useEffect(() => {
    console.debug('[Timeline] @useEffect', from, to )
    if (typeof from === 'number') {
      const nx = scaleX(moment(from, 'YYYY').startOf('year')) + 50
      api.start({ x: -nx, y:0 })
    }
  }, [from, to, api, scaleX])
  if(svgWidth < 0 || paragraphId === '-1,-1') {
    return null
  }
  console.debug('[Timeline]', paragraphId, from, to )

  return (<>
    <div className="Timeline absolute ba" style={{
      height,
      top: marginTop,
      width:  svgWidth ,
      marginLeft,
      marginRight,
      overflow: 'hidden',

    }}>
      <animated.div className="absolute" {...bind()} style={{
        zIndex: 0,
        touchAction: 'none',
        cursor: 'grab',
         x, top: 0, height, width: range[1],
       }}>
        <svg
          className="absolute left-0 top-0"
          style={{ backgroundColor:themeBackgroundColor, zIndex:2}}
          x="0px" y="0px"
          width={range[1]}
          height={50}
        >
          <TrendAxisBottomGraphics
            id={themeDatasetId}
            windowDimensions={[height,width].join('x')}
            marginLeft={50}
            marginTop={0}
            axisOffsetTop={0}
            fontSize={14}
            lineHeight={19}
            tickHeight={7}
            scale={scaleX}
            numTicks={Math.round(range[1] / 80)}
            textColor={'var(--secondary)'}
          />
        </svg>
        <animated.div className="absolute" style={{
          y,
          zIndex:1
        }}>
        {data.map((d, i) => (
          <div key={i} className="absolute top-0 left-0 bl" style={{
            height,
            transform: `translateX(${scaleX(moment(d.t, 'YYYY').startOf('year')) + 50}px)`
          }}>
            <div className="absolute left-0 pa2" style={{
              top: 50, width: 200,
              left: 0,
              backgroundColor: 'transparent' ,
              color: 'var(--secondary)',
              pointerEvents: 'auto',
            }}>
              {d.t}
              <h2 className="bb" style={{color: 'inherit'}}>{d.title}</h2>
              <p dangerouslySetInnerHTML={{
                __html: d.subheading
              }}/>
              {typeof d.description === 'string' && (
                <p className="f7" dangerouslySetInnerHTML={{
                  __html: d.description
                }}/>
              )}
            </div>
          </div>
        ))}
        </animated.div>
      </animated.div>

    </div>
    <svg
      className="absolute top-0"
      x="0px" y="0px"
      width={width}
      height={50}
    >
      <TrendAxisBottomGraphics
        id={themeDatasetId}
        windowDimensions={[height,width].join('x')}
        marginLeft={marginLeft}
        marginTop={0}
        axisOffsetTop={0}
        scale={zoomedOutscaleX}
        numTicks={Math.round(width / 80)}
        textColor={'var(--secondary)'}
      />
    </svg></>
  )
}

export default Timeline

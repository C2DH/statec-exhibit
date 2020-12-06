import React, { Fragment } from 'react';
import moment from 'moment';
import { animated } from 'react-spring';
import { scaleLinear, scaleTime } from 'd3-scale';
import Narrative from '../Narrative/Narrative';
import { isMobileWithTablet, isMobile, isTablet } from '../../constants';
import Link from '../Link';
import MediaImage from '../MediaImage'


const NarrativeFigure = ({ src, caption, alt }) => {
  return (
    <figure
      style={{
        height: '100%',
        backgroundImage: `url(${src})`,
        minHeight: '40vh',
        backgroundSize: 'cover',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <figcaption
        dangerouslySetInnerHTML={{ __html: caption }}
        style={{ padding: '5px', color: 'white' }}
      />
    </figure>
  );
};

const TextContainer = ({
  index,
  module,
  progress,
  from,
  to,
  chapter,
  isLast,
  chapterIndex,
}) => {
  //const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const opacityScale = scaleLinear()
    .domain([0, 0.2, 0.8, 0.95])
    .range([0, 1, 1, 0]);

  const isVisible = !!chapter.paragraphs?.length;
  const startDate = from ? moment(`${from}-01-01`) : moment('1840-01-01');
  const endDate = to ? moment(`${to}-01-01`) : moment('2014-01-01');
  const scaleX = scaleTime()
    .domain([startDate, endDate])
    .range([0.2, 0.8])
    .clamp(true);

  const localYear = scaleX.invert(progress).getFullYear();

  if (!isVisible) {
    return null;
  }

  const localParagraphIndex = chapter.paragraphs.findIndex(
    (p) => localYear >= p.from && localYear <= p.to,
  )
  const localParagraph = chapter.paragraphs[localParagraphIndex];
  const hasCover = !!localParagraph?.cover;
  const showModuleSubheading = module.subheading && localParagraphIndex < 1
  console.info('localParagraphIndex', localParagraphIndex, showModuleSubheading, localYear)
  return (
    <div
      className="scrollSection"
      style={{
        opacity: opacityScale(progress),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/*
        <div className="sectionText"></div>
      */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          className="textContainer"
          style={{
            width: isMobileWithTablet ? '100%' : '50%',
            paddingRight: '15px',
            height: isMobileWithTablet ? '50%' : '100%',
            display: isMobileWithTablet ? 'none' : 'flex',
            flexDirection: isMobileWithTablet ? 'none' : 'column',
          }}
        >
          {/*  */}
          {/* {module.paragraphs && (
          <p className="moduleParagraph">{module.paragraphs}</p>
        )} */}
          {hasCover ? (
            localParagraph.cover.id
            ? <MediaImage
                id={localParagraph.cover.id}
                alt={localParagraph.cover.alt}
                caption={localParagraph.cover.caption}
                title={module.title}
                to={`/doc/${localParagraph.cover.id}`}
              />
            : <NarrativeFigure
                src={localParagraph.cover.url}
                alt={localParagraph.cover.alt}
                caption={localParagraph.cover.caption}
              />
          ) : (
            <Fragment>
              {/* {!isMobileWithTablet && (
                <div className={'secondary'}>{index + 1}</div>
              )} */}
              <div
                className="textContainerTitle"
                style={{ position: 'relative' }}
              >
                {module.title}
              </div>
              {showModuleSubheading && (
                <div
                  className="textContainerSubTitle"
                  dangerouslySetInnerHTML={{
                    __html: module.subheading,
                  }}
                />
              )}
            </Fragment>
          )}
        </div>
        <div
          className="textContainer"
          style={{
            width: isMobileWithTablet ? '100%' : '50%',
            height: isMobileWithTablet ? '50%' : '100%',
            fontSize: '25px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '90%',
              //backgroundColor: 'rgba(0,0,0,0.02)',
              paddingLeft: isMobileWithTablet ? 0 : '10px',
              fontSize: '25px',
            }}
          >
            <Narrative
              chapter={chapter}
              progress={progress}
              from={from}
              to={to}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextContainer;

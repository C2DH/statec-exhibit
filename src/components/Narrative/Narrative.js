import React from 'react';
import moment from 'moment';
import { scaleTime } from 'd3-scale';
import styles from './Narrative.module.css';

const NarrativeFigure = ({ src, caption, alt }) => {
  return (
    <figure style={{height: '20vh'}}>
      <img src={src} style={{objectFit: 'contain', height:'100%'}} alt={alt}/>
      <figcaption dangerouslySetInnerHTML={{__html: caption}} />
    </figure>
  )
}

const Narrative = ({ chapter, progress, from, to }) => {
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

  const localParagraph = chapter.paragraphs.find(
    (p) => localYear >= p.from && localYear <= p.to,
  );
  
  const hasCover = !!localParagraph?.cover;

  return (
    <div className={styles.wrapper}>
      <div className={styles.localYear}>{localYear}</div>
      {localParagraph?.title &&
        <div className={styles.narrativeTitle}>{localParagraph.title}</div>
      }
      {hasCover && (
        <NarrativeFigure
          src={localParagraph.cover.url}
          alt={localParagraph.cover.alt}
          caption={localParagraph.cover.caption} />
      )}
      <div className={styles.narrativeParagraph}>
        {chapter.paragraphs.map((paragraph, i) => {
          const isParagraphVisible =
            localYear >= paragraph.from && localYear <= paragraph.to;
          return (
            <p
              style={{
                display: isParagraphVisible ? 'block' : 'none',
              }}
              key={i}
              dangerouslySetInnerHTML={{
                __html: paragraph.text
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Narrative;

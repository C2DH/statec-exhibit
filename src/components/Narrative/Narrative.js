import React from 'react';
import moment from 'moment';
import {scaleTime} from 'd3-scale';
import styles from './Narrative.module.css';

const Narrative = ({
  chapter,
  progress,
}) => {
  const isVisible = !!chapter.paragraphs?.length;
  const startDate = moment('1840-01-01');
  const endDate = moment('2014-01-01');

  const scaleX = scaleTime()
    .domain([startDate, endDate])
    .range([0.2, 0.8])
    .clamp(true);

  const localYear = scaleX.invert(progress).getFullYear()

  if(!isVisible) {
    return null;
  }

  const localParagraph = chapter.paragraphs.find(p => localYear >= p.from && localYear <= p.to)

  return (
    <div className={styles.wrapper} style={{
      paddingTop: chapter.layout==='text' ? '20vh': 0
    }}>
      <h1 className={styles.h1}>{ localParagraph ? localParagraph.year : localYear }</h1>
      <div className={styles.paragraphs}>
        {chapter.paragraphs.map((paragraph, i) => {
          const isParagraphVisible = localYear >= paragraph.from && localYear <= paragraph.to;
          return (
            <p style={{
              display: isParagraphVisible ? 'block' : 'none'
            }}>{paragraph.text} {i}</p>
          )
        })}
      </div>
    </div>
  )
}

export default Narrative;

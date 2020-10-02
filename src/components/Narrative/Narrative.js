import React from 'react';
import moment from 'moment';
import { scaleTime } from 'd3-scale';
import styles from './Narrative.module.css';

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.narrativeTitle}>
        {localParagraph ? localParagraph.year : localYear}
      </div>
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
            >
              {paragraph.text} {i}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Narrative;

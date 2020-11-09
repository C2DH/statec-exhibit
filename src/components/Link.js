import React from 'react';
import { isMobileWithTablet } from '../constants';

const chapterMeta = {
  '1': {
    link: '/family',
  },
  '2': {
    link: '/a-country-of-migration',
  },
};

function Link({ chapterIndex }) {
  console.log('chapterIndex', chapterIndex);
  return (
    <div
      style={{
        position: 'fixed',
        top: isMobileWithTablet ? 'auto' : '90vh',
        bottom: isMobileWithTablet ? '3vh' : 'auto',
        left: isMobileWithTablet ? 'auto' : '50%',
        right: isMobileWithTablet ? '5%' : 'auto',
        fontSize: '2.4vh',
        fontFamily: 'Sneaky',
        paddingLeft: '10px',
      }}
    >
      <a
        href={chapterMeta[chapterIndex].link}
        style={{ color: '#4d4a6d !important' }}
      >
        {chapterIndex == 1 ? `↓ Next Chapter` : `↑ Previous Chapter`}
      </a>
    </div>
  );
}

export default Link;

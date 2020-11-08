import React from 'react';

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
        bottom: '5%',
        left: '50%',
        fontSize: '2.4vh',
        fontFamily: 'Sneaky',
        color: '#4d4a6d',
        paddingLeft: '10px',
      }}
    >
      <a href={chapterMeta[chapterIndex].link}>
        {chapterIndex == 1 ? `↓ Next Chapter` : `↑ Previous Chapter`}
      </a>
    </div>
  );
}

export default Link;

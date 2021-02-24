import React from 'react'

const Figure = ({ src, caption, alt, className }) => {
  return (
    <figure
      className={className}
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

export default Figure

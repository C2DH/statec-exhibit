import React, { lazy } from 'react';
import { EndYear } from '../../constants';
// import { isMobileWithTablet } from '../../constants';

const MediaImage = lazy(() => import('../MediaImage'));
const Figure = lazy(() => import('../Figure'));

const TextCover = React.memo(({ cover, coverId, title, subheading, themeId, moduleIndex }) => {
  if (cover.id) {
    return (
      <MediaImage
        id={coverId}
        to={`/doc/${cover.id}?from=${themeId}#${themeId}-m${moduleIndex}`}
        alt={cover.alt}
        caption={cover.caption}
        title={title}
      />
    );
  }
  return <Figure src={cover.url} alt={cover.alt} caption={cover.caption} />;
});

const Text = ({ title, subheading, paragraphs, currentYear, themeId, moduleIndex }) => {
  // show subheading only before any paragraphs
  const { currentParagraph, minFrom } = paragraphs.reduce(
    (acc, p) => {
      acc.minFrom = Math.min(parseInt(p.from, 10), acc.minFrom);
      if (
        !acc.currentParagraph &&
        currentYear >= p.from &&
        currentYear <= p.to
      ) {
        acc.currentParagraph = p;
      }
      return acc;
    },
    { minFrom: EndYear, currentParagraph: null },
  );

  const hasCover = !!currentParagraph?.cover;
  const showModuleSubheading = !hasCover && subheading && currentYear < minFrom;

  return (
    <>
      {!hasCover && <h2 className="textContainerTitle">{title}</h2>}
      {hasCover && <TextCover cover={currentParagraph.cover} moduleIndex={moduleIndex} themeId={themeId} coverId={currentParagraph.cover?.id} title={title} />}
      {showModuleSubheading && (
        <div
          className="textContainerSubTitle"
          dangerouslySetInnerHTML={{
            __html: subheading,
          }}
        />
      )}
    </>
  );
};
export default Text;

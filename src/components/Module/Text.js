import React, { lazy } from 'react'
import { EndYear } from '../../constants';

const MediaImage = lazy(() => import('../MediaImage'))
const Figure = lazy(() => import('../Figure'))

const TextCover = React.memo(({ cover, title, subheading }) => {
  if (cover.id) {
    return <MediaImage
      id={cover.id} to={`/doc/${cover.id}`}
      alt={cover.alt} caption={cover.caption} title={title}
    />
  }
  return <Figure src={cover.url} alt={cover.alt} caption={cover.caption}/>
})

const Text = ({ title, subheading, paragraphs, currentYear }) => {
  // show subheading only before any paragraphs
  const { currentParagraph, minFrom } = paragraphs.reduce((acc, p) => {
    acc.minFrom = Math.min(parseInt(p.from, 10), acc.minFrom)
    if (!acc.currentParagraph && currentYear >= p.from && currentYear <= p.to) {
      acc.currentParagraph = p
    }
    return acc
  }, { minFrom: EndYear, currentParagraph: null })

  const hasCover = !!currentParagraph?.cover
  const showModuleSubheading = !hasCover && subheading && currentYear < minFrom

  return (
    <>
      {!hasCover && <h2 className="textContainerTitle">{title}</h2>}
      {hasCover && <TextCover cover={currentParagraph.cover} title={title} />}
      {showModuleSubheading && (
        <div
          className="textContainerSubTitle"
          dangerouslySetInnerHTML={{
            __html: subheading,
          }}
        />
      )}
    </>
  )
}
export default Text

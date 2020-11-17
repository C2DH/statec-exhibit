import React, { Suspense } from 'react';
import Chapter from './components/Chapter/Chapter';
import theme01 from './data/themes/theme-01.json';
import theme02 from './data/themes/theme-02.json';
import { useStore } from './store'


const AvailableThemes = Object.freeze({
  [theme01.id]: theme01,
  [theme02.id]: theme02,
});
const DefaultThemeId = String(theme01.id);

const ChapterContainer = ({
  match: {
    params: { themeId },
  },
}) => {
  const currentTheme =
    AvailableThemes[String(themeId)] ?? AvailableThemes[DefaultThemeId];
  console.info('current theme:', themeId, currentTheme.title);
  React.useEffect(() => {
    useStore.setState({ backgroundColor: currentTheme.backgroundColor })
  }, [currentTheme])

  return (
    <div className="w-100">
    <Suspense>
      <Chapter
        theme={currentTheme}
        heading={true}
        color={currentTheme.backgroundColor}
        headColor={currentTheme.backgroundColor}
        chapterIndex={currentTheme.chapterIndex}
      />
      </Suspense>
    </div>
  );
};

export default ChapterContainer;

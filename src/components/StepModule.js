import React, { Suspense } from 'react';
import { Step } from 'react-scrollama';
import Container from './Chapter/Container';
import TextContainer from './Chapter/TextContainer';
import ImageContainer from './ImageContainer/ImageContainer';
// const Container = React.lazy(() => import('./Chapter/Container'));
// const TextContainer = React.lazy(() => import('./Chapter/TextContainer'));
// const ImageContainer = React.lazy(() =>
//   import('./ImageContainer/ImageContainer'),
// );

const StepModule = ({ theme, data, module, i, progress }) => {
  const moduleDataset = require(`../data/datasets/${module.dataset}.json`);

  return (
    <Step data={i} key={i}>
      <div
        style={{
          height: '200vh',
          paddingTop: module.layout === 'text' ? '60vh' : '18vh',
        }}
      >
        {module.layout === 'image' && (
          <ImageContainer
            index={i}
            module={module}
            progress={i === data ? progress : 0}
            shouldRender={i === data}
            chapter={theme.modules[data]}
            from={theme.modules[data].from}
            to={theme.modules[data].to}
          />
        )}
        {module.layout === 'flowers' && moduleDataset && (
          <Container
            module={module}
            moduleDataset={moduleDataset}
            progress={i === data ? progress : 0}
            shouldRender={i === data}
            focus={theme.modules[data].focus || null}
            chapter={theme.modules[data]}
            extentValues={theme.modules[data].extent}
            from={theme.modules[data].from}
            to={theme.modules[data].to}
          />
        )}
        {module.layout === 'text' && (
          <TextContainer
            index={i}
            module={module}
            progress={i === data ? progress : 0}
            shouldRender={i === data}
            chapter={theme.modules[data]}
            from={theme.modules[data].from}
            to={theme.modules[data].to}
          />
        )}
      </div>
    </Step>
  );
};

export default StepModule;

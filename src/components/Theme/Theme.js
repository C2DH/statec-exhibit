import React, { Fragment } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Trend from '../Trend';
import populationDataset from '../../data/datasets/population.json';
import Flower from '../Flower';

const Theme = ({
  theme,
  progress,
  onStepProgress,
  onStepEnter,
  onStepExit,
}) => {
  const themeDatasetName = theme.dataset;
  const themeDataset = require(`../../data/datasets/${themeDatasetName}.json`);

  return (
    <Fragment>
      <div className="stickyHeader">
        <div className="mt3" style={{ marginLeft: '10%' }}>
          <Trend
            data={populationDataset.values}
            height={70}
            valueKey="v"
            timeKey="t"
            colorB={'#86B9D4'}
            colorA={'#BAE8DB'}
            trendName={'populationTrend'}
            negative={false}
          />
        </div>
      </div>
      <div
        className="w-100 chapter-2"
        style={{ backgroundColor: '#FFD8C2', height: '100vh' }}
      >
        <div className="section">
          <h1 className="tc">{theme.title}</h1>
          <h2 className="sans fw3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </h2>
        </div>
      </div>
      <div>
        <Scrollama
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
          progress={true}
          onStepProgress={onStepProgress}
          debug={true}
          offset={0}
          threshold={2}
        >
          {theme.modules.map((mod) => {
            const datasetName = mod.dataset;
            const flowerDataset = require(`../../data/datasets/${datasetName}.json`);
            const moduleDatasetName = mod.datasetHeading;
            const moduleDataset = require(`../../data/datasets/${moduleDatasetName}.json`);
            return (
              <Step data={1} key={mod.id}>
                <div
                  className="w-100 chapter-1"
                  style={{
                    backgroundColor: '#D0E4E7',
                    height: '250vh',
                    paddingBottom: window.innerHeight * 0.05,
                  }}
                >
                  <div className="section">
                    <Trend
                      data={moduleDataset.values}
                      height={window.innerHeight * 0.2}
                      valueKey="v"
                      timeKey="t"
                      highlightKey="h"
                      colorB={'#86B9D4'}
                      colorA={'#BAE8DB'}
                      trendName={theme.id}
                      progress={progress}
                      negative={true}
                    />
                    <div className="sectionText">
                      <h3>{mod.title}</h3>
                      {mod.subheading && <p>{mod.subheading}</p>}
                    </div>
                    <div className="vizContainer">
                      {flowerDataset.values.map((v) => {
                        return (
                          <div style={{ width: '20%' }}>
                            <Flower
                              colorA={'#F2C4B0'}
                              colorB={'#E989A9'}
                              data={v}
                              height={window.innerHeight * 0.2}
                            />
                          </div>
                        );
                      })}
                      <div style={{ width: '20%' }}>
                        <h3>{flowerDataset.title || 'Lorem ipsum'}</h3>
                        <h5>{flowerDataset.subheading || 'Lorem ipsum'}</h5>
                        <p>
                          {flowerDataset.paragraphs ||
                            'Lorem ipsum dolorem sit amet'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Step>
            );
          })}
        </Scrollama>
      </div>
    </Fragment>
  );
};

export default Theme;

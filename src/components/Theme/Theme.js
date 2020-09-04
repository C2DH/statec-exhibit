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
        <div className="mt3" style={{ marginLeft: '5%' }}>
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
          progress
          onStepProgress={onStepProgress}
          offset={0.2}
          threshold={2}
        >
          {theme.modules.map((mod, i) => {
            const datasetName = mod.dataset;
            const flowerDataset = require(`../../data/datasets/${datasetName}.json`);
            const moduleDatasetName = mod.datasetHeading;
            const moduleDataset = require(`../../data/datasets/${moduleDatasetName}.json`);
            console.log(i);
            return (
              <Step data={i} key={i}>
                <div
                  className="w-100 chapter-1"
                  style={{
                    backgroundColor: '#D0E4E7',
                    height: '250vh',
                    paddingBottom: window.innerHeight * 0.05,
                  }}
                >
                  <div className="section">
                    <div className="sectionTitle">{mod.title}</div>
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
                    <div className="trendText">
                      <h3>{moduleDataset.title}</h3>
                    </div>
                    <hr></hr>
                    <div className="sectionText">
                      <h3>{flowerDataset.title}</h3>
                      {flowerDataset.subheading && (
                        <p>{flowerDataset.subheading}</p>
                      )}
                    </div>
                    <div className="vizContainer">
                      {flowerDataset.values.map((v, j) => {
                        return (
                          <div style={{ width: '15%' }}>
                            <Flower
                              colorA={'#F2C4B0'}
                              colorB={'#E989A9'}
                              data={v}
                              height={window.innerWidth * 0.15}
                              progress={progress}
                              key={`flower-${j}`}
                            />
                          </div>
                        );
                      })}
                      <div style={{ width: '40%', paddingLeft: '30px' }}>
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

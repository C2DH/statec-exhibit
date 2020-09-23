import React, { Fragment } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Trend from '../Trend';
import populationDataset from '../../data/datasets/population.json';
import Flower from '../Flower';
import landing from '../../assets/images/landing.svg';

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
        <div className="mt3" style={{ paddingLeft: '5%' }}>
          <Trend
            data={populationDataset.values}
            height={70}
            valueKey="v"
            timeKey="t"
            trendName={'populationTrend'}
            negative={false}
          />
          <div className="moduleTitle" style={{ top: 10, left: '10vw' }}>
            Population (1840-2014)
          </div>
        </div>
      </div>
      <div
        className="w-100 chapter-2"
        style={{ backgroundColor: '#FFD8C2', height: '100vh' }}
      >
        <div className="section-small">
          <h1 className="tc">Les chiffres des migrations</h1>
          <h2 className="sans fw3 mt0">Framing Luxembourg</h2>
          <img src={landing} width={250} />
        </div>
      </div>
      <div>
        <Scrollama
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
          progress
          onStepProgress={onStepProgress}
          offset={0}
          threshold={2}
        >
          {theme.modules.map((mod, i) => {
            const datasetName = mod.dataset;
            const flowerDataset = require(`../../data/datasets/${datasetName}.json`);
            const moduleDatasetName = mod.datasetHeading;
            const moduleDataset = require(`../../data/datasets/${moduleDatasetName}.json`);
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
                    <div className="sectionTitle">{theme.title}</div>
                    <div className="relative">
                      <Trend
                        data={moduleDataset.values}
                        height={window.innerHeight * 0.2}
                        valueKey="v"
                        timeKey="t"
                        highlightKey="h"
                        trendName={theme.id}
                        progress={progress}
                        negative={true}
                      />
                      <div className="moduleTitle" style={{ bottom: -16 }}>
                        {moduleDataset.title}
                      </div>
                    </div>

                    <div className="hr"></div>
                    <div className="sectionText">
                      <div
                        className="moduleTitle"
                        style={{ position: 'relative' }}
                      >
                        {flowerDataset.title}
                      </div>
                      {flowerDataset.subheading && (
                        <div className="moduleSubTitle">
                          {flowerDataset.subheading}
                        </div>
                      )}
                      {flowerDataset.paragraphs && (
                        <p className="moduleParagraph">
                          {flowerDataset.paragraphs}
                        </p>
                      )}
                    </div>
                    <div className="vizContainer">
                      <div
                        style={{
                          width: '60%',
                          display: 'flex',
                          overflow: 'hidden',
                        }}
                      >
                        {flowerDataset.values.map((v, j) => {
                          return (
                            <div style={{ width: '50%' }} key={`flower-${j}`}>
                              <Flower
                                colorA={'#F2C4B0'}
                                colorB={'#E8BCA9'}
                                colorC={'#E989A9'}
                                data={v}
                                height={window.innerWidth * 0.25}
                                progress={progress}
                                key={`flower-${j}`}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ width: '40%', paddingLeft: '30px' }}>
                        <div className="peakDate">Peak date</div>
                        <div className="peakTitle">
                          Peak explanation lorem ipsum dolor sit amet,
                          consectetur adipiscing elit, sed do eiusmod tempor
                          incididunt ut labore et dolore magna aliqua.
                        </div>
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

import React, { Fragment } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Trend from '../Trend';
import populationDataset from '../../data/datasets/population.json';
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
      <div
        className="w-100 chapter-2"
        style={{ backgroundColor: '#FFD8C2', height: '100vh' }}
      >
        <div
          className="absolute"
          style={{
            backgroundColor: '#FFD8C2',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 2,
          }}
        >
          <div className="section-small">
            <h1 className="tc">Les chiffres des migrations</h1>
            <h2 className="sans fw3 mt0">Framing Luxembourg</h2>
            <img src={landing} width={250} />
          </div>
        </div>
      </div>
      <div>
        <div
          className="w-100 chapter-1"
          style={{
            backgroundColor: 'rgb(208, 228, 231)',
            paddingBottom: window.innerHeight * 0.05,
          }}
        >
          <div className="section" style={{ paddingTop: '30px' }}>
            <div
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 3,
                backgroundColor: 'rgb(208, 228, 231)',
                height: '45vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'justify-between',
              }}
            >
              <div style={{ height: '170px' }}>
                <div className="mt3" style={{ paddingTop: '50px' }}>
                  <Trend
                    data={populationDataset.values}
                    height={70}
                    valueKey="v"
                    timeKey="t"
                    trendName={'populationTrend'}
                    negative={false}
                  />
                  <div className="moduleTitle" style={{ top: 10 }}>
                    Population (1840-2014)
                  </div>
                </div>
              </div>
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
                <div className="moduleTitle" style={{ bottom: -30 }}>
                  {moduleDataset.title}
                </div>
              </div>
              <div className="hr"></div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <Scrollama
                onStepEnter={this.onStepEnter}
                onStepExit={this.onStepExit}
                progress
                onStepProgress={this.onStepProgress}
                offset={0.42}
                threshold={0}
              >
                {theme.modules.map((mod, i) => {
                  const datasetName = mod.dataset;
                  const flowerDataset = require(`./data/datasets/${datasetName}.json`);
                  const moduleDatasetName = mod.datasetHeading;
                  return (
                    <Step data={i} key={i}>
                      <div style={{ height: '200vh', paddingTop: '50vh' }}>
                        <Container
                          flowerDataset={flowerDataset}
                          progress={i === data ? progress : 0}
                        />
                      </div>
                    </Step>
                  );
                })}
              </Scrollama>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Theme;

import React, { PureComponent } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import ChapterGraphicContainer from './ChapterGraphicContainer';
import ChapterScrollamaTrends from './ChapterScrollamaTrends';
import ChapterProgress from './ChapterProgress';
import { isMobileWithTablet } from '../../constants';

class ChapterScrollama extends PureComponent {
  state = {
    data: 0,
    steps: [],
    progress: 0,
    scrolled: false,
  };

  componentDidUpdate() {
    clearInterval(this.timerID);
  }
  componentDidMount() {
    clearInterval(this.timerID);
    window.dispatchEvent(new Event('resize'));
    let c = 0;
    this.timerID = setInterval(() => {
      c += 1;
      window.dispatchEvent(new Event('resize'));
      if (c > 10) {
        clearInterval(this.timerID);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onStepEnter = ({ element, data }) => {
    this.setState({ data });
  };

  onStepExit = ({ element, data }) => {
    console.info('@onStepExit');
    // this.setState({ data });
  };

  onStepProgress = ({ progress }) => {
    this.setState({ progress });
  };

  render() {
    const { theme } = this.props;
    const { progress, data } = this.state;
    const currentModule = theme.modules[data ?? 0];
    return (
      <div className="w-100">
        {data > -1 && (
          <ChapterScrollamaTrends
            theme={theme}
            progress={progress}
            data={data}
          />
        )}
        <ChapterGraphicContainer module={currentModule} progress={progress} />
        {!isMobileWithTablet && (
          <ChapterProgress
            steps={theme.modules}
            currentStep={data}
            progress={progress}
          />
        )}

        <Scrollama
          onStepEnter={this.onStepEnter}
          onStepExit={this.onStepExit}
          progress
          onStepProgress={this.onStepProgress}
          offset={0.42}
          threshold={0}
        >
          {theme.modules.map((module, i) => (
            <Step data={i} key={i}>
              <div
                className="w-100"
                style={{
                  height: window.innerHeight * 2,
                  // borderTop: '1px solid'
                }}
              >
                &nbsp;
              </div>
            </Step>
          ))}
        </Scrollama>

        <div
          style={{
            position: 'fixed',
            bottom: 2,
            width: '100%',
            fontSize: '12px',
            margin: '0 auto',
            padding: '15px',
            textAlign: 'center',
            opacity: 0.4,
          }}
        >
          Please visit our desktop version for a complete experience
        </div>
      </div>
    );
  }
}

export default ChapterScrollama;

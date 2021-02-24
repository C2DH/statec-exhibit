import React, { PureComponent } from 'react';
import { Scrollama, Step } from 'react-scrollama';

class ChapterConclusions extends PureComponent {
  state = {
    data: -1,
    steps: [],
  };

  onStepEnter = ({ element, data }) => {
    this.setState({ data });
  };

  render() {
    const { conclusions, themeId } = this.props
    const { data } = this.state;
    return <Scrollama
      onStepEnter={this.onStepEnter}
      offset={.5}
      threshold={0}
    >
      <Step data={-1}>
        <div className="w-100" style={{
          height: '25vh',
        }}>&nbsp;</div>
      </Step>
      {conclusions.map(({ text }, i) => (
        <Step data={i} key={i}>
          <div id={`${themeId}-c${i}`}
            className="ChapterConclusions_step w-100"
          >
          <div
            className="textContainer tc h-100 flex flex-column"
            style={{
              paddingRight: '15px',
              willChange: 'opacity',
              transition: 'opacity .5s ease-in-out',
              opacity: data === i? 1: 0.1
            }}
          >
            <div className="textContainerSubTitle" dangerouslySetInnerHTML={{
              __html: text,
            }}/>
          </div>
          </div>
        </Step>
      ))}
    </Scrollama>
    }
}

export default ChapterConclusions;

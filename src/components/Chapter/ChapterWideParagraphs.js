import React, { PureComponent } from 'react';
import { Scrollama, Step } from 'react-scrollama';

class ChapterWideParagraphs extends PureComponent {
  state = {
    data: -1,
    steps: [],
  };

  onStepEnter = ({ element, data }) => {
    this.setState({ data });
  };

  render() {
    const { paragraphs = [], themeId } = this.props
    const { data } = this.state;
    return <Scrollama
      onStepEnter={this.onStepEnter}
      offset={0}
      threshold={1}
    >
      {paragraphs.map(({ text }, i) => (
        <Step data={i} key={i}>
          <div id={`${themeId}-c${i}`}
            className="ChapterWideParagraphs_textContainer tc h-100 flex flex-column"
            style={{
              paddingRight: '15px',
              willChange: 'opacity',
              transition: 'opacity .5s ease-in-out',
              opacity: data === i? 1: 0.1
            }}
          > eh{i} {data}
            <div className="textContainerSubTitle" dangerouslySetInnerHTML={{
              __html: text,
            }}/>
          </div>
        </Step>
      ))}
    </Scrollama>
    }
}

export default ChapterWideParagraphs;

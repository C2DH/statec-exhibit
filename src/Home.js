import React, { Component } from 'react'
import Timeline from './Timeline'
import { Scrollama, Step } from 'react-scrollama';

class Home extends Component {

  onStepEnter = ({ data }) => {
    console.log(data)
  };

  onStepProgress = ({ element, data, progress }) => {
    console.log(element, data, progress)
  };

  render() {
    return (
      <div className="w-100 h-100">
        <Scrollama onStepEnter={this.onStepEnter} onStepProgress={this.onStepProgress} debug progress>
          <Step data={0} key={0}>
            <div className="w-100 h-100 chapter-2" style={{ backgroundColor: 'yellow'}}>
            </div>
          </Step>
          <Step data={1} key={1}>
            <div className="w-100 h-100 chapter-1">
              <Timeline />
            </div>
          </Step>
          <Step data={2} key={2}>
            <div className="w-100 h-100 chapter-2" style={{ backgroundColor: 'red'}}>
            </div>
          </Step>
          <Step data={3} key={3}>
            <div className="w-100 h-100 chapter-3" style={{ backgroundColor: 'green'}}>
            </div>
          </Step>
        </Scrollama>
      </div>
      
    );
  }
}

export default Home;

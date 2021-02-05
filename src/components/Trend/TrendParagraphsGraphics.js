import React from 'react';
import { curveMonotoneX } from '@vx/curve';
import { LinePath } from '@vx/shape';

class TrendParagraphsGraphics extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.id !== nextProps.id ||
      this.props.currentParagraph?.idx !== nextProps.currentParagraph?.idx ||
      this.props.windowDimensions !== nextProps.windowDimensions
    );
  }

  render() {
    const { marginLeft, marginTop, paragraphs, scaleX, scaleY } = this.props;
    const currentParagraphIdx = this.props.currentParagraph?.idx;
    const x = (d) => scaleX(d.time);
    const y = (d) => scaleY(d.value);

    return (
      <g
        className="TrendParagraphsGraphics"
        transform={`translate(${marginLeft}, ${marginTop})`}
      >
        {paragraphs.map((p, i) => (
          <LinePath
            data={p.values}
            key={`linepath-${i}`}
            x={x}
            y={y}
            curve={curveMonotoneX}
            stroke={currentParagraphIdx === p.idx ? '#D1646C' : '#80b5d0'}
            strokeWidth={2}
          />
        ))}
      </g>
    );
  }
}

export default TrendParagraphsGraphics;

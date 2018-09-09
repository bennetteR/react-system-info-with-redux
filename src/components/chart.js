import React from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import './chart.css';

class Chart extends React.Component {

    render() {
        const svgWidth = 960,
        svgHeight = 500;
    
        //Note: getting width and height from a variable rather than the elements attribute e.g. svg.attr("width")
        const margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;
    
        const x = scaleBand()
            .rangeRound([0, width])
            .padding(0.1),
        y = scaleLinear().rangeRound([height, 0]);
    
        x.domain(this.props.values.map(d => d.time));
        y.domain([0, max(this.props.values, d => d.value)]);

        return (
            <svg width={svgWidth} height={svgHeight}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <g
                className='axis axis--x'
                transform={`translate(0, ${height})`}
                ref={node => select(node).call(axisBottom(x))}
              />
              <g className='axis axis--y'>
                <g ref={node => select(node).call(axisLeft(y).ticks(10, '%'))} />
                 <text transform='rotate(-90)' y='6' dy='0.71em' textAnchor='end'>
                  Value
                </text>
              </g>
              {this.props.values.map((d, i) => (
                <rect
                  key={i}
                  className='bar'
                  x={x(d.time)}
                  y={y(d.value)}
                  width={x.bandwidth()}
                  height={height - y(d.value)}
                />
              ))}
            </g>
          </svg>
        )
    };
}

export default Chart;
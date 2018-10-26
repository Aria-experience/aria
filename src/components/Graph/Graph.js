import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import {throttle} from 'underscore';

// App
import {Wrapper, GRAPH_HEIGHT, GRAPH_LINES_COLOR} from './Graph.styles';
const POINTS_THRESHOLD = 20;

const options = {
    title: {text: ''},
    legend: {enabled: false},
    credits: {
        text: ''
    },
    chart: {
        backgroundColor: 'transparent',
        animation: false,
        height: GRAPH_HEIGHT
    },
    xAxis: {
        labels: {
            enabled: false
        },
        lineColor: GRAPH_LINES_COLOR,
        tickColor: 'transparent'
    },
    yAxis: {
        title: {
            text: 'RGB values (0-255)'
        },
        min: 0,
        max: 255,
        minRange: 255,
        //endOnTick: false,
        gridLineColor: GRAPH_LINES_COLOR
    },
    plotOptions: {
        series: {
            turboThreshold: POINTS_THRESHOLD,
            cropThreshold: POINTS_THRESHOLD,
            animation: 0,
            marker: {enabled: false}
        }
    },
    series: [
        {
            name: 'r',
            type: 'spline',
            color: 'red',
            data: []
        },
        {
            name: 'b',
            type: 'spline',
            color: 'blue',
            data: []
        },
        {
            name: 'g',
            type: 'spline',
            color: 'green',
            data: []
        }
    ]
};

// Graph Component
class Graph extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Create the chart with options and attach to the container
        this.chart = new Highcharts.chart('chart-container', options);
    }

    drawLines = () => {
        if (this.chart) {
            // Go through each data "series"
            this.chart.series.map(serie => {
                // Handle the center point RGB line
                if (
                    serie.name === 'r' ||
                    serie.name === 'g' ||
                    serie.name === 'b'
                ) {
                    serie.addPoint(this.props.point[serie.name], false);
                    if (serie.data.length > POINTS_THRESHOLD) {
                        serie.removePoint(0, false);
                    }
                }
            });

            this.chart.redraw();
        }
    };

    componentDidUpdate(prevProps) {
        // If the map is moving, draw the lines and throttle
        this.props.moving && throttle(this.drawLines(), 100);
    }

    render() {
        return (
            <Wrapper>
                <div id="chart-container" />
            </Wrapper>
        );
    }
}

Graph.propTypes = {
    moving: PropTypes.bool,
    point: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default Graph;

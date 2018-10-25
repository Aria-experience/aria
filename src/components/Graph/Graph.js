import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ResponsiveXYFrame} from 'semiotic';

// App
import {Wrapper} from './Graph.styles';

const data = [
    {
        id: 'linedata-1',
        color: '#00a2ce',
        data: [
            {sales: 500, daysSinceRelease: 1},
            {sales: 700, daysSinceRelease: 2},
            {sales: 0, daysSinceRelease: 3},
            {sales: 0, daysSinceRelease: 4},
            {sales: 200, daysSinceRelease: 5},
            {sales: 300, daysSinceRelease: 6},
            {sales: 500, daysSinceRelease: 7}
        ]
    },
    {
        id: 'linedata-1',
        color: 'red',
        data: [
            {sales: 52, daysSinceRelease: 1},
            {sales: 12, daysSinceRelease: 2},
            {sales: 4, daysSinceRelease: 3},
            {sales: 16, daysSinceRelease: 4},
            {sales: 644, daysSinceRelease: 5},
            {sales: 333, daysSinceRelease: 6},
            {sales: 88, daysSinceRelease: 7}
        ]
    }
];

// Graph Component
class Graph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redData: [],
            blueData: [],
            greenData: []
        };
    }

    addData = dataType => {};

    generateData = () => {};

    render() {
        return (
            <Wrapper>
                <ResponsiveXYFrame
                    responsiveWidth={true}
                    size={[500, 300]}
                    responsiveHeight={false}
                    lines={data}
                    xAccessor="daysSinceRelease"
                    yAccessor="sales"
                    lineDataAccessor="data"
                    lineStyle={d => ({stroke: d.color, fill: d.color})}
                />
            </Wrapper>
        );
    }
}

Graph.propTypes = {};

export default Graph;

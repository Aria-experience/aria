import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nameColor from 'color-namer';

// App
import {Swatch, ColorText} from './ColorSwatch.styles';

// Component
class ColorSwatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // If the color changes
        if (prevProps.color !== this.props.color) {
            // Calculate a "color name"
            const colorName = nameColor(this.props.color, {pick: ['ntc']})
                .ntc[0].name;
            // Update state
            this.setState({name: colorName});
        }
    }

    render() {
        return (
            <Swatch color={this.props.color}>
                <ColorText title="Color Name">{this.state.name}</ColorText>
            </Swatch>
        );
    }
}

ColorSwatch.propTypes = {
    color: PropTypes.string
};

export default ColorSwatch;

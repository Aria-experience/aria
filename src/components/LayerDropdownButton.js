import React from 'react';
import styled from 'react-emotion';

import PropTypes from 'prop-types';

export const gibs = {
    modisReflectance: {
        title: 'MODIS Terra Visual',
        productName: 'MODIS_Terra_CorrectedReflectance_TrueColor',
        date: '2013-06-15',
        format: 'jpg',
        matrix: 'GoogleMapsCompatible_Level9'
    },
    humanPop: {
        title: 'Human Footprint (Global Human Footprint, 1995-2004)',
        productName: 'Human_Footprint_1995-2004',
        matrix: 'GoogleMapsCompatible_Level7',
        format: 'png'
    },
    vegetation: {
        title: 'Vegetation Index (8-Day, MODIS, Terra)',
        productName: 'MODIS_Terra_NDVI_8Day',
        format: 'png',
        date: '2018-10-15',
        matrix: 'GoogleMapsCompatible_Level9'
    },
    biosphere: {
        title: 'Last_of_the_Wild_1995-2004',
        productName: 'Last_of_the_Wild_1995-2004',
        matrix: 'GoogleMapsCompatible_Level7',
        format: 'png'
    },
    night: {
        title: 'Earth at Night  2012',
        productName: 'VIIRS_CityLights_2012',
        format: 'jpeg',
        date: '2016-03-18',
        matrix: 'GoogleMapsCompatible_Level8'
    }
};

const Container = styled.div`
    font-size: 20px;
    position: absolute;
    z-index: 999999;
    top: 90px;
    right: 10px;
    margin-left: 10px;

    display: inline-block;
`;
const Button = styled.button`
    width: 200px;
    padding: 5px 16px;
    border: none;
    font-weight: bold;
    font-size: 20px
    color: white;
    background-color: white;
`;

const List = styled.ul`
    width: 200px;
    color: black;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px;

    display: ${props => (props.visible ? 'block' : 'none')};

    font-size: 14px;
`;

const Item = styled.li`
    margin-left: 10px;
    &:hover {
        color: red;
        cursor: pointer;
    }

    color: ${props => (props.selected ? 'green' : 'black')};
`;

class LayerDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayMenu: false
        };
    }

    showLayerDropdownMenu = event => {
        this.setState({displayMenu: true});
    };

    hideLayerDropdownMenu = event => {
        this.setState({displayMenu: false});
    };

    renderItems(items) {
        return Object.keys(items).map(key => {
            return (
                <Item
                    selected={this.props.selected === key}
                    key={key}
                    onClick={() => this.handleClick(key)}
                >
                    {items[key].title}
                </Item>
            );
        });
    }

    handleClick = provider => {
        this.props.handleClick && this.props.handleClick(provider);
    };

    render() {
        return (
            <Container>
                <Button
                    onClick={
                        this.state.displayMenu
                            ? this.hideLayerDropdownMenu
                            : this.showLayerDropdownMenu
                    }
                >
                    {this.state.displayMenu
                        ? 'Hide Layers Menu'
                        : 'Show Layers Menu'}
                </Button>

                <List visible={this.state.displayMenu}>
                    {this.renderItems(gibs)}
                </List>
            </Container>
        );
    }
}

LayerDropdown.propTypes = {
    handleClick: PropTypes.func,
    selected: PropTypes.string
};

export default LayerDropdown;

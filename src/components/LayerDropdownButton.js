import React from 'react';
import styled from 'react-emotion';

import PropTypes from 'prop-types';

const gibs = {
    modisReflectance: {
        title: 'MODIS Terra Visual',
        productName: 'MODIS_Terra_CorrectedReflectance_TrueColor'
    },
    humanPop: {
        title: 'Humans',
        productName: 'Human_Footprint_1995-2004'
    },
    vegetation: {
        title: 'Vegetation',
        productName: 'MODIS_Terra_NDVI_8Day'
    },
    biosphere: {title: 'Biosphere', productName: 'Last_of_the_Wild_1995-2004'},
    fire: {
        title: 'Fire',
        productName: 'MODIS_Fires_Terra'
    }
};

const Container = styled.div`
    font-size: 20px;
    position: absolute;
    z-index: 999999;
    top: 0;
    left: 0;
    margin-left: 10px;

    display: inline-block;
`;
const Button = styled.button`
width: 150px;
    padding: 5px 16px;
    border-radius: 5px;
    border: none;
    font-weight: bold;
    font-size: 20px
    color: white;
    background-color: #96aff6;
`;

const List = styled.ul`
    width: 150px;
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
                    onClick={() => this.handleClick(items[key].productName)}
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

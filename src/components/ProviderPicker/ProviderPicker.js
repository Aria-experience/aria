import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {BounceLoader, ClipLoader} from 'react-spinners';

// App

// Styles
import {
    Wrapper,
    Header,
    LayersList,
    LoadingIndicator,
    LayerListItem,
    ShowHideButton,
    HeaderTop,
    NASA_RED,
    NASA_BLUE
} from './ProviderPicker.styles';

// Provider Picker Component
class ProviderPicker extends Component {
    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            open: false, // If the sidebar is open or not
            selected: 'MODIS_Terra_CorrectedReflectance_TrueColor' // the identifier of the currently selected layer, initially set to MOIDS
        };
    }

    // Limit when the component re-renders based on whether or not this lifecycle return true
    shouldComponentUpdate(nextProps, nextState) {
        // Only update if we get the new capabilities list
        if (!this.props.capabilities && nextProps.capabilities) {
            return true;
        }

        // Or if selected changes
        if (this.state.selected !== nextState.selected) {
            return true;
        }

        // Or if open changes
        if (this.state.open !== nextState.open) {
            return true;
        }

        // by default don't update
        return false;
    }

    // Toggle the sidebar
    toggleOpen = () => this.setState({open: !this.state.open});

    // Get a layer object by id/identifier of the layer
    getLayerById = id =>
        this.props.capabilities &&
        this.props.capabilities.Contents.Layer.find(
            item => item.Identifier === id
        );

    // Handle setting the currently selected item
    setSelected = id => {
        // Send the selected Id to parent component
        this.props.handleSelect && this.props.handleSelect(id);

        // Set the selected id
        this.setState({selected: id});
    };

    // Render an individual layer item
    renderLayerItem = item => (
        <LayerListItem
            onClick={() => this.setSelected(item.Identifier)}
            selected={item.Identifier === this.state.selected}
            key={item.Identifier}
        >
            {item.Title}
        </LayerListItem>
    );

    // Render the layer items list
    renderCatalogItems() {
        // If we have the capabilities,
        if (this.props.capabilities) {
            // Get the layers array from the capabilities object
            const layers = this.props.capabilities.Contents.Layer;

            return (
                <LayersList>
                    {layers.map(item => this.renderLayerItem(item))}
                </LayersList>
            );
        } else {
            // If we don't have the layers yet, render the loading indicator
            return (
                <LoadingIndicator>
                    <BounceLoader
                        sizeUnit={'px'}
                        size={150}
                        color={NASA_BLUE}
                        loading={true}
                    />
                    <br />
                    <strong>UPLINKING TO NASA...</strong>
                </LoadingIndicator>
            );
        }
    }

    render() {
        return (
            <Fragment>
                <ShowHideButton
                    onClick={this.props.capabilities && this.toggleOpen}
                    open={this.state.open}
                    showTag={this.props.capabilities}
                    title={
                        this.state.open
                            ? 'Hide Sources Menu'
                            : 'Show Sources Menu'
                    }
                >
                    {!this.props.capabilities ? (
                        <ClipLoader
                            sizeUnit={'px'}
                            size={40}
                            color={NASA_RED}
                        />
                    ) : this.state.open ? (
                        '𝗫'
                    ) : (
                        '☰'
                    )}
                </ShowHideButton>
                {this.props.capabilities && (
                    <Wrapper open={this.state.open}>
                        <Header>
                            <HeaderTop>
                                <img src="https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg" />
                                <div>
                                    <h3>Data Sources</h3>
                                    <h4>
                                        <a
                                            href="https://earthdata.nasa.gov/gibs"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="NASA Global Imagery Browse Services"
                                        >
                                            NASA GIBS ({
                                                this.props.capabilities.Contents
                                                    .Layer.length
                                            })
                                        </a>
                                    </h4>
                                </div>
                            </HeaderTop>

                            <h5>
                                <strong>Current Source:</strong> <br />
                                {
                                    this.getLayerById(this.state.selected)[
                                        'Title'
                                    ]
                                }
                            </h5>
                        </Header>
                        {this.renderCatalogItems()}
                    </Wrapper>
                )}
            </Fragment>
        );
    }
}

ProviderPicker.propTypes = {
    capabilities: PropTypes.object,
    handleSelect: PropTypes.func
};

export default ProviderPicker;

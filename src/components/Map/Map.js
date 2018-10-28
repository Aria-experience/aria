import React, {Component} from 'react';
import * as Vibrant from 'node-vibrant';

// Open Layers Imports
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import {DEVICE_PIXEL_RATIO} from 'ol/has.js';
import {toLonLat} from 'ol/proj';
// App
import {
    getLayerById,
    createWMTSsourceFromCapabilities,
    fetchGibsCapabilities
} from './utils';
import Play from '../Audio';
import Graph from '../Graph';
import AriaLogo from '../../assets/logo.png';
// Styles
import {
    MapContainer,
    Header,
    Subtitles,
    Footer,
    MapCenterLatLong,
    HeaderRight,
    HeaderLeft,
    DataSource,
    SplashOverlay,
    SplashContent,
    StartButton
} from './Map.styles';
import ColorSwatch from '../ColorSwatch';
import ProviderPicker from '../ProviderPicker';

// The default start layer
const START_LAYER = {
    title: 'Corrected Reflectance (True Color, VIIRS, SNPP)',
    id: 'VIIRS_SNPP_CorrectedReflectance_TrueColor'
};

// Map Component
class AppMap extends Component {
    constructor(props) {
        super(props);

        // initial state\\
        this.state = {
            radius: 10,
            color: null,
            centerPx: null,
            centerColor: 'transparent',
            viewportPalette: null,
            version: 0,
            mapMoving: false,
            currentLayer: START_LAYER.id,
            capabilities: null,
            splash: true
        };

        this.mousePosition = null;
    }

    // Things that happen when the component first mounts
    componentDidMount() {
        // Get the gibs data list and set it to state
        fetchGibsCapabilities().then(capabilities =>
            this.setState({capabilities: capabilities})
        );

        // Initialize the Map
        this.createMap();

        // Window.resize event listener
        window.addEventListener('resize', this.handleResize, {
            passive: true
        });
    }

    // When the component unmounts
    componentWillUnmount() {
        // Remove window resize event listener
        window.removeEventListener('resize', this.handleResize);
    }

    // Whenever the component updates
    componentDidUpdate(prevProps, prevState) {
        // Update the current layer
        if (prevState.currentLayer !== this.state.currentLayer) {
            // Set the new source as the data layer source on the map
            this.dataLayer.setSource(
                createWMTSsourceFromCapabilities(
                    this.state.currentLayer,
                    this.state.capabilities
                )
            );
        }

        // Check if the palette changed
        if (
            prevState.viewportPalette &&
            prevState.viewportPalette.DarkMuted !==
                this.state.viewportPalette.DarkMuted
        ) {
            // Pass the new value to the music Play function
            Play(this.state.viewportPalette.DarkMuted);
        }
    }

    // Handle resizing of window, with debouncer for performance
    handleResize = () => {
        // Debounce resize:

        // Initial Timeout
        let timeout = false;

        // clear the timeout
        clearTimeout(timeout);
        // start timing for event "completion"
        timeout = setTimeout(() => {
            // Update the map size
            this.map.updateSize();

            // Reset the map center state
            this.setMapCenterXY();
        }, 200);
    };

    // Create our map
    createMap = () => {
        // The Map View
        this.view = new View({
            center: fromLonLat([0, 0]),
            zoom: 4,
            minZoom: 0,
            maxZoom: 20
        });

        // The OpenLayers Map Object
        this.map = new Map({
            target: 'map-container',
            view: this.view
        });

        // Create the data layer
        this.createDataLayer();

        /* Map Listeners */

        // Set initial map center
        this.setMapCenterXY();

        // When the map gets moved (dragged)
        this.map.on('pointerdrag', event => {
            // Get the current center lat long on the map

            if (this.state.centerPx) {
                // Get the current center pixels
                const centerPixels = [
                    this.state.centerPx.x * DEVICE_PIXEL_RATIO,
                    this.state.centerPx.y * DEVICE_PIXEL_RATIO
                ];

                // Calculate the center coordinate of the map (in lonlat)
                //from the center pixel values, and truncate to 5 places
                const centerLatLong = toLonLat(
                    this.map.getCoordinateFromPixel(centerPixels)
                ).map(coord => coord.toFixed(5));

                // Set the center lat long coordinate, and moving state to true
                this.setState({
                    ...this.state,
                    centerLatLong: {
                        lon: centerLatLong[0],
                        lat: centerLatLong[1]
                    },
                    mapMoving: true
                });
            }
        });

        // When map finishes moving (panning)
        this.map.on('moveend', event => {
            // extracts color after moving map
            //this.extractColorsfromImage(event);

            // Unset map moving state
            this.setState({mapMoving: false});
        });
    };

    // Set the map version (a little trick to force map to update)
    setMapVersion = () => {
        this.setState({version: +!this.state.version});
    };

    // Get the center of the map in screen pixel coordinates ([x,y])
    setMapCenterXY = () => {
        // Get the x,y coordinates
        const x = (window.innerWidth / 2) * DEVICE_PIXEL_RATIO;
        const y = (window.innerHeight / 2) * DEVICE_PIXEL_RATIO;

        // Update State
        this.setState({centerPx: {x, y}});
    };

    // Set the center color values
    setCenterColorValues = context => {
        // Read the pixel value at center
        const imageData = context.getImageData(
            this.state.centerPx.x,
            this.state.centerPx.y,
            1,
            1
        ).data;

        // Construct color variable
        const color = {r: imageData[0], g: imageData[1], b: imageData[2]};

        // Update state
        this.setState({centerColor: color});
    };

    //Extracts color palette
    extractColorsfromImage = event => {
        // Get the canvas DOM element
        const ctx = document.querySelector('canvas');

        // Get the image data from the canvas context
        const imageData = ctx.toDataURL('image/png');

        // Use vibrant to calculate the prominent colors
        Vibrant.from(imageData).getPalette((err, palette) => {
            if (err) {
                console.error(err);
            } else {
                // Set the viewport palette
                this.setState({viewportPalette: palette});
                //this.setMapVersion();
                //console.log('PALETTE', palette);
            }

            // Example Palette usage:
            //palette.DarkMuted.getRgb();
        });
    };

    // Creates the data layer
    createDataLayer = () => {
        // Create a temporary Layer Source to show while we load the gibs catalog
        const startSource = new XYZ({
            crossOrigin: 'anonymous',
            url: `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${
                this.state.currentLayer
            }/default/2016-01-10/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`
        });

        //Create Layer Source
        //this.dataLayerSource = new WMTS();

        // Create Layer
        this.dataLayer = new TileLayer({
            source: startSource,
            zIndex: 1
        });

        /* Attach "compose" listeners */

        // Post compose
        this.dataLayer.on('postcompose', this.onDataLayerPostcompose);

        this.map.addLayer(this.dataLayer);
    };

    toggleSplash = () => this.setState({splash: !this.state.splash});

    // Handle Chaning the current map layer
    handleLayerChange = layerId =>
        this.setState({
            currentLayer: layerId
        });

    // Post Compose for map layer
    onDataLayerPostcompose = ({
        context: ctx,
        frameState: {pixelRatio},
        ...event
    }) => {
        //ctx.restore();
        //ctx.save();

        // Update center color value
        this.setCenterColorValues(ctx);

        // If center is ready
        if (this.state.centerPx && !this.state.splash) {
            // Begin drawing the "circle crosshair"
            ctx.beginPath();

            // Draw a circle in center of map
            ctx.arc(
                this.state.centerPx.x,
                this.state.centerPx.y,
                this.state.radius * pixelRatio,
                0,
                2 * Math.PI
            );
            ctx.lineWidth = 3 * pixelRatio;
            ctx.strokeStyle = 'white';
            ctx.stroke();

            // Draw a rectangle around center pixel
            ctx.rect(
                this.state.centerPx.x - 1,
                this.state.centerPx.y - 1,
                3,
                3
            );
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    };

    render() {
        // Construct color code
        const colorCode = `rgb(${this.state.centerColor.r}, ${
            this.state.centerColor.g
        }, ${this.state.centerColor.b})`;
        return (
            <MapContainer id="map-container">
                {!this.state.splash && (
                    <Header role="banner">
                        <HeaderLeft>
                            <a
                                href="http://aria.earth"
                                title="Aria: Earth has a Voice. Take a Listen."
                            >
                                <h1>
                                    <img src={AriaLogo} alt="Aria" />
                                </h1>
                            </a>

                            <Subtitles>
                                <h2>Earth has a Voice. Take a Listen</h2>
                                <h3>
                                    Algorithmically Generated Music for Earth
                                    Observation
                                </h3>
                            </Subtitles>
                        </HeaderLeft>
                        <HeaderRight>
                            <DataSource>
                                <strong>Current Data Source:</strong>
                                {this.state.currentLayer === START_LAYER.id
                                    ? START_LAYER.title
                                    : this.state.capabilities
                                        ? getLayerById(
                                              this.state.currentLayer,
                                              this.state.capabilities
                                          )['Title']
                                        : ''}
                            </DataSource>
                        </HeaderRight>
                    </Header>
                )}
                <ColorSwatch color={colorCode} />
                <Graph
                    point={this.state.centerColor}
                    moving={this.state.mapMoving}
                />
                <Footer>
                    {this.state.centerLatLong && (
                        <MapCenterLatLong>
                            Lon/Lat:{' '}
                            {`${this.state.centerLatLong.lon}, ${
                                this.state.centerLatLong.lat
                            }`}
                        </MapCenterLatLong>
                    )}
                </Footer>
                {!this.state.splash && (
                    <ProviderPicker
                        capabilities={this.state.capabilities}
                        handleSelect={this.handleLayerChange}
                    />
                )}

                {this.state.splash && (
                    <SplashOverlay>
                        <SplashContent>
                            <h1>
                                <img src={AriaLogo} alt="Aria" />
                            </h1>
                            <h2>Earth has a Voice. Take a Listen.</h2>
                            <p>
                                Aria is a synthesizer that generates music and
                                sounds from Earth Observation data.
                            </p>
                            <StartButton onClick={this.toggleSplash}>
                                Tap to Begin!
                            </StartButton>
                        </SplashContent>
                    </SplashOverlay>
                )}
            </MapContainer>
        );
    }
}

AppMap.propTypes = {};

export default AppMap;

/*  */

import React, {Component} from 'react';
import * as Vibrant from 'node-vibrant';

// Open Layers Imports
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import {DEVICE_PIXEL_RATIO} from 'ol/has.js';
import OSM from 'ol/source/OSM';
import {toLonLat} from 'ol/proj';

// App
import {createDataLayerXYZUrl} from './utils';
import Play from '../Audio';
import {gibs} from '../LayerDropdownButton';
import Graph from '../Graph';

// Styles
import {
    MapContainer,
    Header,
    Title,
    Footer,
    MapCenterLatLong
} from './Map.styles';
import LayerDropdown from '../LayerDropdownButton';
import ColorSwatch from '../ColorSwatch';
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
            provider: 'modisReflectance',
            mapMoving: false
        };

        this.mousePosition = null;
    }

    // Things that happen when the component first mounts
    componentDidMount() {
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
        //console.warn('componentDidUpdate');

        // Check if the palette changed
        if (
            prevState.viewportPalette &&
            prevState.viewportPalette.DarkMuted !==
                this.state.viewportPalette.DarkMuted
        ) {
            // Pass the new value to the music Play function
            Play(this.state.viewportPalette.DarkMuted);
        }

        // Update the map layer with new provider
        if (this.state.provider !== prevState.provider) {
            // check if the layer source is available
            if (this.source) {
                // Construct the new layer url
                const url = createDataLayerXYZUrl(
                    gibs[this.state.provider].productName,
                    gibs[this.state.provider].date,
                    null,
                    gibs[this.state.provider].matrix,
                    gibs[this.state.provider].format
                );

                // Update the source url
                this.source.setUrl(url);
            }
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
        // The basemap layer
        this.basemapLayer = new TileLayer({
            source: new OSM(),
            zIndex: 0,
            visible: false
        });

        // The Map View
        this.view = new View({
            center: fromLonLat([0, 0]),
            zoom: 4,
            minZoom: 0,
            maxZoom: 20
        });

        // The OpenLayers Map Object
        this.map = new Map({
            layers: [
                this.createDataLayerXYZ(
                    gibs[this.state.provider].productName,
                    gibs[this.state.provider].date,
                    null,
                    null,
                    gibs[this.state.provider].format
                )
            ],
            target: 'map-container',
            view: this.view
        });

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

        /*
        // Add mouse listener
        this.map.on('pointermove', event => {
            //console.log('');
            //console.log('pointermove event', event);

            this.mousePosition = event.pixel;
             //console.log('this.mousePosition', this.mousePosition);
             this.map.render();
             //var xy = event.pixel;
             //console.log('this.map', this.map);
             //var pixelAtClick = canvasContext.getImageData(xy[0], xy[1], 1, 1).data;
             //var red = pixeAtClick[0]; // green is [1] , blue is [2] , alpha is [4]
         });
         */
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
    createDataLayerXYZ = () => {
        // Create Layer Source
        this.source = new XYZ({
            crossOrigin: 'anonymous',
            //url: testUrl
            url: createDataLayerXYZUrl(
                gibs[this.state.provider].productName,
                gibs[this.state.provider].date,
                null,
                null,
                gibs[this.state.provider].format
            )
        });

        // Create Layer
        this.dataLayer = new TileLayer({
            source: this.source,
            zIndex: 1
        });

        /* Attach "compose" listeners */

        // Pre compose
        //this.dataLayer.on('precompose', this.onDataLayerPrecompose);

        // Post compose
        this.dataLayer.on('postcompose', this.onDataLayerPostcompose);

        // Mouse position pixels
        // this.dataLayer.on('postcompose', this.getMousePixelValues);

        // Layer Spy
        //this.dataLayer.on('precompose', event => this.spyCompose('precompose', event));
        //this.dataLayer.on('postcompose', event =>  this.spyCompose('postcompose', event));

        return this.dataLayer;
    };

    // Handle Chaning the provider
    onProviderChange = provider => {
        this.setState({
            ...this.state,
            provider: provider,
            version: +!this.state.version
        });
    };

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

        // Animate trail from center value --mel is still working on this
        if (this.state.centerPx) {
            ctx.beginPath();
            ctx.rect(500, 500, 5, 5);
            //ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            ctx.stroke();
        }

        // If center is ready
        if (this.state.centerPx) {
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

    // //Animation Loop
    // animateTrail = ({context: ctx}) => {
    //     // const duration = trailDuration * 1000 / 60;
    //     // const point, lastPoint;
    //     requestAnimationFrame(animateTrail);
    //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //     //loop here
    // };

    /*
    onDataLayerPrecompose = ({
        context: ctx,
        frameState: {pixelRatio},
        ...event
    }) => {};
    */

    /*
    // Layer spy compose
    spyCompose = (type, event) => {
        const ctx = event.context;

        if (type === 'postcompose') {
            ctx.restore();
        } else {
            const pixelRatio = event.frameState.pixelRatio;
            ctx.save();
            ctx.beginPath();
            if (this.mousePosition) {
                // only show a circle around the mouse
                ctx.arc(
                    this.mousePosition[0] * pixelRatio,
                    this.mousePosition[1] * pixelRatio,
                    this.state.radius * pixelRatio,
                    0,
                    2 * Math.PI
                );
                ctx.lineWidth = 5 * pixelRatio;
                ctx.strokeStyle = 'rgba(0,0,0,0.5)';
                ctx.stroke();
            }
            ctx.clip();
        }
    };
    */
    /*
    // Calculate pixel color values at mouse position
    getMousePixelValues = event => {
        //console.log('');
        //console.warn('getPixelValues');
        //console.log('event', event);

        const {
            context: ctx,
            frameState: {pixelRatio}
        } = event;

        if (this.mousePosition) {
            const x = this.mousePosition[0] * pixelRatio;
            const y = this.mousePosition[1] * pixelRatio;

            const imageData = ctx.getImageData(x, y, 1, 1).data;

            const color =
                'rgb(' +
                imageData[0] +
                ',' +
                imageData[1] +
                ',' +
                imageData[2] +
                ')';

            //console.log('color', color);

            this.setState({color: color});
        }
    };
    */

    render() {
        // Construct color code
        const colorCode = `rgb(${this.state.centerColor.r}, ${
            this.state.centerColor.g
        }, ${this.state.centerColor.b})`;
        return (
            <MapContainer id="map-container">
                <Header>
                    <img src="https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg" />
                    <Title>
                        <h1>
                            <span className="white">Aria</span> / Earth<span>
                                Moog
                            </span>
                        </h1>
                        <h2>
                            Algorithmically Generated Music for Earth
                            Observation
                        </h2>
                    </Title>
                </Header>
                <LayerDropdown
                    visible={this.state.provider}
                    handleClick={this.onProviderChange}
                />
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
            </MapContainer>
        );
    }
}

AppMap.propTypes = {};

export default AppMap;

/*  */

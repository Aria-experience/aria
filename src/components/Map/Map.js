import React, {Component} from 'react';

// Open Layers Imports
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import XYZ from 'ol/source/XYZ';

import OSM from 'ol/source/OSM';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {get as getProjection} from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';
import {getWidth, getTopLeft} from 'ol/extent';

// App
import {createDataLayerXYZUrl} from './utils';

// Styles
import {MapContainer} from './Map.styles';

// Map Component
class AppMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            radius: 10
        };

        this.mousePosition = null;
    }

    componentDidMount() {
        // Initialize the Map
        this.createMap();
    }

    createMap = () => {
        // The basemap layer
        this.basemapLayer = new TileLayer({
            source: new OSM(),
            zIndex: 0,
            visible: false
        });

        // The OpenLayers Map Object
        this.map = new Map({
            layers: [this.basemapLayer, this.createDataLayerXYZ()],
            target: 'map-container',
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 4,
                minZoom: 0,
                maxZoom: 20
            })
        });

        // Add mouse listener
        this.map.on('pointermove', event => {
            console.log('event', event);
            this.mousePosition = event.pixel;
            console.log('this.mousePosition', this.mousePosition);
            this.map.render();
        });
    };

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

    // Creates the data layer
    createDataLayerXYZ = () => {
        // TODO: remove these temporary layer configs and use dynamic url creation function instead
        const product = 'MODIS_Terra_CorrectedReflectance_TrueColor';
        const date = '2013-06-15';
        const testUrl =
            'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/' +
            'MODIS_Terra_CorrectedReflectance_TrueColor/default/2013-06-15/' +
            'GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg';

        // Create Layer Source
        this.source = new XYZ({
            url: testUrl
            //url: createDataLayerXYZUrl(product, date)
        });

        // Create Layer
        this.dataLayer = new TileLayer({
            source: this.source,
            zIndex: 1
        });

        // Attach "compose" listeners
        this.dataLayer.on('precompose', event =>
            this.spyCompose('precompose', event)
        );
        this.dataLayer.on('postcompose', event =>
            this.spyCompose('postcompose', event)
        );

        return this.dataLayer;
    };

    render() {
        return <MapContainer id="map-container" />;
    }
}

AppMap.propTypes = {};

export default AppMap;

/*  */

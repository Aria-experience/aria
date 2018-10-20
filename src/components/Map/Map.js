import React, {Component} from 'react';
import {MapContainer} from './Map.styles';

import Map from 'ol/Map';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import OSM from 'ol/source/OSM';

class AppMap extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.createMap();
    }

    createMap = () => {
        const basemapLayer = new TileLayer({
            source: new OSM()
            /*
            source: new XYZ({
              url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png'})
              */
        });

        this.map = new Map({
            layers: [basemapLayer],
            target: 'map-container',
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 6
            })
        });
    };

    render() {
        return <MapContainer id="map-container" />;
    }
}

AppMap.propTypes = {};

export default AppMap;

import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS';

// App
import {GIBS_CAPABILITIES_URL} from './constants';

// Define the WMTS Capabilities Parser
const parser = new WMTSCapabilities();

// Get Capabilities from GIBS
export const fetchGibsCapabilities = () =>
    fetch(GIBS_CAPABILITIES_URL)
        .then(response => response.text())
        .then(text => parser.read(text));

// Get a layer object by id/identifier of the layer from a capabilities list
export const getLayerById = (id, capabilities) =>
    capabilities &&
    capabilities.Contents.Layer.find(item => item.Identifier === id);

// Create a layer source from a layer and and capabilities
export const createWMTSsourceFromCapabilities = (layerId, capabilities) => {
    // Create options from the capabilities list for the new current layer
    const options = optionsFromCapabilities(capabilities, {
        layer: layerId,
        crossOrigin: 'anonymous',
        wrapX: false
    });

    // Create a new source object using the options
    const newSource = new WMTS(options);

    // Get the dimensions for the source
    const dimensions = newSource.getDimensions();

    // Update the dimensions, because the URL expects {Time} not {time}
    newSource.updateDimensions({Time: dimensions.time});

    return newSource;
};

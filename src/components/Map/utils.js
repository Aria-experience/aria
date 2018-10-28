import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import {optionsFromCapabilities} from 'ol/source/WMTS.js';

// App
import {
    GIBS_BASE_URL,
    GIBS_DEFAULT_SUFFIX,
    XYZ_SUFFIX,
    DEFAULT_FORMAT_SUFFIX,
    GIBS_CAPABILITIES_URL
} from './constants';

// Creates the data layer url
// Uses "XYZ" format
// ex) https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Aerosol/default/2014-04-09/GoogleMapsCompatible_Level6/{z}/{x}/{y}.png
export const createDataLayerXYZUrl = (
    productName,
    date,
    baseUrl = GIBS_BASE_URL,
    urlSuffix = GIBS_DEFAULT_SUFFIX,
    fileFormat = DEFAULT_FORMAT_SUFFIX
) =>
    `${baseUrl || GIBS_BASE_URL}/${productName}/default/${
        date ? date + '/' : ''
    }${urlSuffix || GIBS_DEFAULT_SUFFIX}/${XYZ_SUFFIX}${fileFormat}`;

// Define the WMTS Capabilities Parser
const parser = new WMTSCapabilities();

// Get Capabilities from GIBS
export const fetchGibsCapabilities = () =>
    fetch(GIBS_CAPABILITIES_URL)
        .then(response => response.text())
        .then(text => parser.read(text));

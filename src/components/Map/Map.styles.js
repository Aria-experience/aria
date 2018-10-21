import styled from 'react-emotion';

export const MapContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: black;
`;

export const Swatch = styled.div`
    background-color: ${props => props.color || 'transparent'};

    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;

    border: 1px solid red;
    z-index: 9999;
`;

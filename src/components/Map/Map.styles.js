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
    z-index: 9999;
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;

    border: 3px solid red;
    background-color: ${props => props.color || 'transparent'};
`;

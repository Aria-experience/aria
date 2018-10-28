import styled from 'react-emotion';

const HEADER_HEIGHT = 115;

export const MapContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: black;

    overflow: hidden;
`;

export const Header = styled.header`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    width: 100vw;
    height: ${HEADER_HEIGHT}px;
    display: flex;
    flex-direction: row;

    background: #8a2387; /* fallback for old browsers */
    background: linear-gradient(to left, #f27121, #e94057, #8a2387);

    box-shadow: 0 8px 4px -4px rgba(0, 0, 0, 0.5);

    img {
        margin-top: 20px;
        margin-left: 10px;
    }
`;

export const HeaderLeft = styled.div`
    flex: 1 0 auto;
    display: flex;
    align-items: center;

    /* Logo and title */
    h1 {
        padding: 5px 10px;
        color: white;
        font-weight: 100;
        margin: 0px 10px;
        text-transform: uppercase;

        img {
            height: ${HEADER_HEIGHT - 30}px;
            width: auto;
        }
    }
`;
export const HeaderRight = styled.div`
    flex: 0 0 auto;
    position: relative;
    color: white;
`;

export const DataSource = styled.div`
    position: absolute;
    bottom: -35px;
    right: 20px;

    height: 60px;
    width: 350px;
    text-align: right;

    padding: 10px;
    background-color: white;
    color: black;

    box-shadow: -3px 3px 2px rgba(0, 0, 0, 0.5);

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    strong {
        display: block;
    }

    /* For Phone */
    @media only screen and (max-width: 600px) {
        width: 100vw;
        bottom: -60px;
        right: 0;
    }
`;

export const Subtitles = styled.div`
    h2 {
        margin: 0px;
        color: white;
        font-weight: 100;
        font-size: 25px;
        margin-bottom: 5px;
    }
    h3 {
        margin: 0px;
    }

    @media only screen and (max-width: 600px) {
        h2,
        h3 {
            display: none;
        }
    }
`;

export const MapCenterLatLong = styled.span`
    color: rgba(255, 255, 255, 0.8);
`;

export const Footer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;

    padding: 5px 8px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;

    text-align: right;
`;

export const Swatch = styled.div`
    z-index: 99999999;
    position: absolute;
    bottom: 25px;
    right: 10px;
    width: 30px;
    height: 167px;

    border: 1px solid rgba(255, 255, 255, 0.5);
    background-color: ${props => props.color || 'transparent'};

    transition: width 0.5s ease-in-out;

    &:hover {
        width: 100px;
    }
`;

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

    @media only screen and (max-width: 600px) {
        height: 80px;
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

            @media only screen and (max-width: 600px) {
                height: 50px;
            }
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

    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.5);

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

export const SplashOverlay = styled.div`

    background-color: rgba(0,0,0,0.8);
    position:absolute;
    z-index: 9999999999;

    height: 100%;
    width: 100%;

    top:0;
    left:0;
    right:0;
    bottom:0:

`;

export const SplashContent = styled.div`
    color: white;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -60%, 0);

    width: 400px;
    text-align: center;

    @media only screen and (max-width: 400px) {
        width: 100%;
    }

    h1 {
        img {
            width: 300px;
            height: auto;

            @media only screen and (max-width: 400px) {
                width: 200px;
            }
        }
    }

    h2 {
        color: #f27121;
        font-weight: 100;
        padding: 10px;
    }

    p {
        text-align: center;
        max-width: 300px;
        font-size: 20px;
        line-height: 1.2;
        margin: 0 auto;
        padding: 10px;

        @media only screen and (max-width: 400px) {
            max-width: 100%;
        }
    }
`;

export const StartButton = styled.button`
    padding: 10px;
    width: 300px;
    outline: none;
    margin-top: 30px;

    color: white;
    text-transform: uppercase;
    background: linear-gradient(to left, #f27121, #e94057, #8a2387);
    font-size: 30px;
    border: 0px;

    @media only screen and (max-width: 400px) {
        width: 90%;
    }

    &:hover {
        cursor: pointer;
    }
`;

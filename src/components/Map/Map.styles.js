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
    z-index: 99999999;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 70px;
    height: 70px;

    border: 3px solid white;
    background-color: ${props => props.color || 'transparent'};
`;

export const Header = styled.header`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99999;

    width: 100vw;
    height: 130px;

    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.9) 00%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0) 100%
    );
    background: rgba(0, 0, 0, 0.8);

    img {
        margin-top: 20px;
        margin-left: 10px;
    }
`;

export const Title = styled.div`
    position: absolute;
    left: 100px;
    width: 700px;
    top: 20px;
    font-family: 'Lato', sans-serif;

    h1 {
        padding: 5px 10px;
        display: inline-block;
        color: #fc3d21;
        font-weight: 100;
        margin: 0px 10px;
        font-family: sans-serif;
        /*  background-color: white;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5); */
        text-transform: uppercase;

        span {
            /*  color: #0b3d91; */
            color: white;

            font-weight: bold;

            &.white {
                color: #0b3d91;
            }
        }
    }

    h2 {
        display: inline-block;
        margin: 0px 10px;
        color: white;
        font-weight: 100;
        padding: 5px 10px;
    }
`;

export const ToggleSound = styled.div`
    z-index: 99999999;
    position: absolute;
    top: 35px;
    right: 90px;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    color: white;
`;

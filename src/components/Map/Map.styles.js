import styled from 'react-emotion';

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
    height: 130px;
    display: flex;
    flex-direction: row;

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

export const HeaderLeft = styled.div`
    flex: 1 0 auto;
`;
export const HeaderRight = styled.div`
    flex: 0 0 auto;
    position: relative;
    color: white;
`;

export const DataSource = styled.div`
    position: absolute;
    bottom: -30px;
    right: 20px;

    height: 60px;
    width: 350px;
    text-align: right;

    padding: 10px;
    background-color: #666666;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    strong {
        display: block;
    }
`;

export const Title = styled.div`
    position: absolute;
    left: 100px;
    width: 700px;
    top: 20px;

    h1 {
        padding: 5px 10px;
        display: inline-block;
        color: #fc3d21;
        font-weight: 100;
        margin: 0px 10px;
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

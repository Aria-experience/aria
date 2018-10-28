import styled from 'react-emotion';

const HEADER_HEIGHT = 170;
export const NASA_RED = '#fc3d21';
export const NASA_BLUE = '#0b3d91';

const BASE_ZINDEX = 99999999;

export const Wrapper = styled.div`
    position: absolute;
    color: white;

    right: 0;
    top: 0;
    bottom: 0;
    width: 400px;

    z-index: ${BASE_ZINDEX};

    background-color: black;

    transition: transform 0.5s ease-in-out;
    transform: translate3d(${({open}) => (open ? '0' : '100%')}, 0, 0);
`;

export const LoadingIndicator = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-25%, -25%, 0);

    width: 200px;
    height: 200px;
`;

export const ShowHideButton = styled.div`
    position: absolute;
    top: 20px;
    right: 10px;
    z-index: ${BASE_ZINDEX + 1};

    width: 40px;
    height: 40px;

    color: ${({open}) => (open ? NASA_RED : 'white')};

    font-size: 35px;

    &:hover {
        cursor: pointer;
    }

    &:before {
        content: '';
        position: absolute;
        top: 9px;
        left: -20px;
        display: ${({open, showTag}) => (!open && showTag ? 'block' : 'none')};
        width: 0;
        height: 0;

        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;

        border-left: 12px solid ${NASA_BLUE};
    }

    &:after {
        position: absolute;
        top: 0;
        left: 0;
        display: ${({open, showTag}) => (!open && showTag ? 'block' : 'none')};

        width: 190px;
        content: 'Explore More Datasets!';
        font-size: 18px;
        transform: translateX(-230px);
        padding: 10px;

        background-color: ${NASA_BLUE};
    }
`;

export const Header = styled.div`
    height: ${HEADER_HEIGHT}px;
    padding: 20px;
    overflow: hidden;

    h5 {
        margin-top: 5px;
        margin-bottom: 0px;
        font-weight: normal;
        font-size: 18px;

        width: 350px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        color: ${NASA_RED};

        strong {
            text-transform: uppercase;
            color: white;
            font-weight: normal;
        }
    }

    background-color: black;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

export const HeaderTop = styled.div`
    display: flex;
    flex-direction: row;

    img {
        float: left;
        flex: 0 0 auto;
    }

    div {
        flex: 0 1 auto;
    }

    h3 {
        margin-bottom: 0px;
    }

    h4 {
        margin: 0;
        font-weight: normal;
        font-size: 20px;
        a {
            color: ${NASA_BLUE};
        }
    }
`;

export const LayersList = styled.ul`
    list-style-type: none;
    margin: 0px;
    padding: 0px;

    position: absolute;
    top: ${HEADER_HEIGHT}px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20px;

    overflow-x: hidden;
    overflow-y: auto;
`;

export const LayerListItem = styled.li`
    margin: 0px;
    padding: 10px;

    background-color: rgba(255, 255, 255, 0.2);

    &:nth-child(even) {
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:nth-child(even),
    &:nth-child(odd) {
        ${({selected}) => selected && `background-color: ${NASA_RED};`};
    }

    transition: background 0.3s ease-in-out;

    &:hover {
        background-color: ${NASA_BLUE};
        cursor: pointer;
    }
`;

import styled from 'react-emotion';

export const ColorText = styled.span`
    opacity: 0;
    display: block;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    top: 69px;
    right: -68px;
    width: 165px;
    height: 27px;
    padding-top: 5px;
    text-align: center;
    transform: rotate(90deg);
    font-weight: bold;
    transition: opacity 0.5s ease-in-out;
`;

export const Swatch = styled.div`
    z-index: 99999999;
    position: absolute;
    bottom: 25px;
    right: 10px;
    width: 30px;
    height: 167px;

    background-color: ${props => props.color || 'transparent'};

    transition: width 0.5s ease-in-out;
    overflow: hidden;

    &:hover {
        /* width: 100px; */
        ${ColorText} {
            opacity: 1;
        }
    }
`;

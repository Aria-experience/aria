import styled from 'react-emotion';

const PlayButton = styled.button`
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 99999;

    background-color: transparent;
    border: none;

    outline: none;

    &:hover {
      cursor:pointer;
    }

    &:after {
        font-size: 50px;
        color: ${props => (props.playing ? 'red' : 'green')};
        content: '${props => (props.playing ? '⏸' : '►')}';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);


    }
`;

export default PlayButton;

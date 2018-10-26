import styled from 'react-emotion';

export const GRAPH_HEIGHT = 200;
export const Wrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: ${GRAPH_HEIGHT}px;
    z-index: 9999;
    overflow: hidden;

    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.7) 50%,
        rgba(0, 0, 0, 0) 100%
    );
`;

export const GRAPH_LINES_COLOR = 'rgba(255, 255, 255, 0.2)';

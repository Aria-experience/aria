import styled, {injectGlobal} from 'react-emotion';

export const GlobalStyles = () => injectGlobal`
* {
    box-sizing: border-box;
  }

  body, html {
    margin:0;
    padding:0;
    font-family: 'Lato', sans-serif;
  }

  a {
    text-decoration: none;
    transition: color 0.3s ease-in-out;

    &:hover {
    }
  }
`;

export const Wrapper = styled.div`
    ${GlobalStyles()};
`;

import React from 'react';
import {hot} from 'react-hot-loader';
import Home from '../components/Home';

import {Wrapper} from './Global.styles';

const App = () => (
    <Wrapper>
        <Home />
    </Wrapper>
);

export default hot(module)(App);

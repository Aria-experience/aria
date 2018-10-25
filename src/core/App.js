import React from 'react';
import {hot} from 'react-hot-loader';
import Home from '../components/Home';

import {Wrapper} from './Global.styles';

import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faVolumeUp,
    faVolumeOff,
    faVolumeMute
} from '@fortawesome/free-solid-svg-icons';

library.add(faVolumeUp, faVolumeOff, faVolumeMute);

const App = () => (
    <Wrapper>
        <Home />
    </Wrapper>
);

export default hot(module)(App);

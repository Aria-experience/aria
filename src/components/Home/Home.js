import React, {Component} from 'react';
import Map from '../Map';

// Style
import {Wrapper} from './Home.styles';

class Home extends Component {
    render() {
        return (
            <Wrapper>
                <Map />
            </Wrapper>
        );
    }
}

export default Home;

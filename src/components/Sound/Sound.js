import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

// App
import PlayButton from './components/PlayButton';

// Component
class Sound extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: true
        };
    }

    togglePlaying = () => this.setState({playing: !this.state.playing});

    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        return (
            <PlayButton
                onClick={this.togglePlaying}
                playing={this.state.playing}
            />
        );
    }
}

Sound.propTypes = {};

export default Sound;

/*

    Tone.Transport.stop();
        Tone.Transport.start('+0.0');


*/

import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Tone from 'tone';
import {transpose, scale} from 'tonal';

// App
import PlayButton from './components/PlayButton';
import {Beat} from './audio/synths';

class Sound {
    constructor() {}

    init() {
        console.warn('init sound');

        Beat.toMaster();
        /*
        new Tone.Loop(time => {
            Beat.triggerAttackRelease('D3', 1, time);
        }, '1m').start();

 */

        var synth = new Tone.AMSynth().toMaster();

        const aScale = scale('major').map(transpose('C2'));
        console.log('scale', aScale);

        new Tone.Pattern(
            (time, note) => {
                synth.triggerAttackRelease(note, '16n', time);
            },
            ['C4', 'E4', 'G4', 'A4'],
            'alternateUp'
        ).start();

        Tone.Transport.start();
    }

    play() {
        Tone.Transport.start();
    }

    stop() {
        Tone.Transport.stop();
    }
}
/*
// Component
class Sound extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: true
        };
    }

    togglePlaying = () => this.setState({playing: !this.state.playing});

    componentDidMount() {
        Beat.toMaster();

        this.Loop = new Tone.Loop(time => {
            Beat.triggerAttackRelease('C4', 1, time);
        }, '1m').start();

        Tone.Transport.start();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate');

        if (!this.state.playing) {
            Tone.Transport.start();
        } else {
            Tone.Transport.stop();
        }
    }

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
 */
export default Sound;

/*

    Tone.Transport.stop();
        Tone.Transport.start('+0.0');


*/

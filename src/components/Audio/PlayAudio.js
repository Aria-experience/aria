import Tone from 'tone';
import tonal from 'tonal';

class Play {
    constructor() {}

    init() {
        this.melodySynth = new Tone.AMSynth({}).toMaster();

        this.transport = new Tone.Transport();
    }

    startAudio = () => {
        this.transport.start();
    };

    stopAudio = () => {
        this.transport.stop();
    };
}

export default Play;

/*

1. direct input from center -> rgb
2. "ambient" backing track / "rythem section" -> palette

*/

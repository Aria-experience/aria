import Tone from 'tone';
import tonal from 'tonal';
import {calculateLumFromRGB} from './audioHelpers';

class Play {
    constructor() {}

    init() {
        this.melodySynth = new Tone.AMSynth({}).toMaster();

        /*
        this.melody =  new Tone.Pattern(
            (time, note) => {
                synth.triggerAttackRelease(note, '16n', time);
            },
            ['C4', 'E4', 'G4', 'A4'],
            'alternateUp'
        );//.start();
         */

        Tone.Transport.start();
    }

    playSingleNoteFromColor = color => {
        // higher brightness (luminance) = higher note
        // 255 = white
        // 0 = black

        // luminance is 0-255
        const lum = calculateLumFromRGB(color);

        //console.log('lum', lum);

        //TODO: we need to generate a note from a value of lum using tonal
        //const note =

        // this.melodySynth.triggerAttackRelease(note, '16n');
    };

    startAudio = () => {
        Tone.Transport.start();
    };

    stopAudio = () => {
        Tone.Transport.stop();
    };
}

export default Play;

/*

1. direct input from center -> rgb
2. "ambient" backing track / "rythem section" -> palette

*/

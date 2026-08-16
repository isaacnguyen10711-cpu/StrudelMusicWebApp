import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
/*import console_monkey_patch, { getD3Data } from './console-monkey-patch';*/
import Instruments from './components/Instruments';
import PlayButtons from './components/PlayButtons';
import PreprocessButtons from './components/PreprocessButtons';
import TextToProcess from './components/TextToProcess';
import TextEditor from './components/TextEditor';
import Cpm from './components/Cpm';
import VolumeControls from './components/VolumeControls';
import AudioEffects from './components/AudioEffects';
import LoadAndSaveSettings from './LoadAndSaveSettings'


//Test comments

export let globalEditor = null;


const handleD3Data = (event) => {
    console.log(event.detail);
};

export function ProcAndPlay(procText, setProcText) {
/*    if (globalEditor != null && globalEditor.repl.state.started === true) {*/
        console.log(globalEditor)
        Proc(procText, setProcText)
        globalEditor.evaluate();
    }
//}

export function Proc(procText, setProcText) {
    setProcText(procText)
    globalEditor.setCode(procText)
}


// A function to collect all the instruments existing in the text box
export function CreateInstrumentList(procText) {
    // Created a regex to match which ever instrument that starts with instrumental_ can be used with the radio buttons
    const regex = /^\s*_?instrumental_(.*):/gm;

    // Find the instruments and convert it to an array
    const instrumentListRaw = Array.from(procText.matchAll(regex));
    console.log("Instrumental List Raw: " + instrumentListRaw);
    // Convert the raw array to a new array with only the instruments name
    const instrumentList = instrumentListRaw.map(i => i[1]);
    console.log("Instrumental List: " + instrumentList)
    return instrumentList;
}

export default function StrudelDemo() {

    const [procText, setProcText] = useState(stranger_tune);

    // Setting up states to react to changes when users click on buttons
    const [isPlaying, setIsPlaying] = useState(false);

    const [instrumentList, setInstrumentList] = useState([]);
    const [instrumentIsPlayingList, setInstrumentIsPlayingList] = useState([])


const hasRun = useRef(false);

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        /*console_monkey_patch();*/
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

        Proc(procText, setProcText)
        setInstrumentList(CreateInstrumentList(procText))

        // A new array to push "true" to all instrument states
        const defaultStates = [];
        for (let i = 0; i < CreateInstrumentList(procText).length; i++) {
            defaultStates.push(true);
        }
        setInstrumentIsPlayingList(defaultStates)
    }


}, [procText]);


return (
    <div className="App">
        <div className='row app-header-row'>
            <h2 className="app-title mt-4">Strudel Music </h2>
        </div>
        <div className='row settings-row'>
            <LoadAndSaveSettings
                procText={procText}
                setProcText={setProcText}
                instrumentList={instrumentList}
                setInstrumentList={setInstrumentList}
                instrumentIsPlayingList={instrumentIsPlayingList}
                setInstrumentIsPlayingList={setInstrumentIsPlayingList}
            />
        </div>
        <main>
            <div className="container-fluid app-shell">
                <div className="row mb-2 justify-content-center">
                    <PlayButtons
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                    /> 
                </div>

                <div className="row mb-3">
                    <PreprocessButtons
                        procText={procText}
                        setProcText={setProcText}
                        instrumentList={instrumentList}
                        instrumentIsPlayingList={instrumentIsPlayingList}
                        setInstrumentList={setInstrumentList}
                        setInstrumentIsPlayingList={setInstrumentIsPlayingList}
                        setIsPlaying={setIsPlaying}
                        />
                </div>
                <div className="row control-grid">
                    <div className="col-12 col-lg-4 control-section">
                        <Cpm
                            procText={procText}
                            setProcText={setProcText}
                            isPlaying={isPlaying}
                        />
                        <div className="mt-4">
                            <VolumeControls
                                procText={procText}
                                setProcText={setProcText}
                                isPlaying={isPlaying}
                            />
                        </div>
                    </div>
                        <div className="col-12 col-lg-4 control-section">
                        <Instruments
                            procText={procText}
                            setProcText={setProcText}
                            instrumentIsPlayingList={instrumentIsPlayingList}
                            setInstrumentIsPlayingList={setInstrumentIsPlayingList}
                            instrumentList={instrumentList}
                            isPlaying={isPlaying}
                            />
                    </div>

                    <div className="col-12 col-lg-4 control-section">
                        <AudioEffects
                            procText={procText}
                            setProcText={setProcText}
                            isPlaying={isPlaying}
                        />
                    </div>
                </div>

                <div className="row mt-4 mb-4">
                    <TextToProcess
                        procText={procText}
                        setProcText={setProcText}
                        
                    />
                </div>
                <div className="row">
                    <TextEditor />
                </div>

            </div>

            <canvas id="roll"></canvas>
        </main>
    </div>
);


}

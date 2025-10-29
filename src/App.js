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
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJButtons from './components/DJButtons';
import PlayButtons from './components/PlayButtons';
import PreprocessButtons from './components/PreprocessButtons';
import TextToProcess from './components/TextToProcess';


//Test comments

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export function ProcAndPlay() {
    if (globalEditor != null && globalEditor.repl.state.started == true) {
        console.log(globalEditor)
        Proc()
        globalEditor.evaluate();
    }
}

export function Proc() {

    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
    ProcessText(proc_text);
    globalEditor.setCode(proc_text_replaced)
}

export function ProcessText(match, ...args) {

    let replace = ""
    if (document.getElementById('flexRadioDefault2').checked) {
        replace = "_"
    }

    return replace
}

export default function StrudelDemo() {

    // Setting up states to react to changes when users click on buttons
    const [isConfiguringDJ, setIsConfiguringDJ] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPreprocessing, setIsPreprocessing] = useState(false);

    const handleDJButtons = () => {
        ProcessText()
        setIsConfiguringDJ(true)
    }

    // React-styled function to handle play button
    const handlePlay = () => {
        if (globalEditor) {
            globalEditor.evaluate();
            setIsPlaying(true);
        }
    }
    // React-styled function to handle stop button
    const handleStop = () => {
        if (globalEditor) {
            globalEditor.stop();
            setIsPlaying(false);
        }
    }
    // React-styled function to handle preprocess button
    const handlePreprocess = () => {
        Proc();
        setIsPreprocessing(true);
    }

    const handleProcesAndPlay = () => {
        if (globalEditor) {
            Proc();
            globalEditor.evaluate();
            setIsPreprocessing(true);
            setIsPlaying(true);
        }
    }

const hasRun = useRef(false);

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
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
            
        document.getElementById('proc').value = stranger_tune
        Proc()
    }

}, []);


return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <TextToProcess

                        />
                    </div>
                    <div className="col-md-4">

                        <nav>
                            <PreprocessButtons
                                preprocessClick={handlePreprocess}
                                preprocessAndPlayClick={handleProcesAndPlay}
                            />
                            <br />
                            <PlayButtons
                                playClick={handlePlay}
                                stopClick={handleStop}
                            />
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <div className="col-md-4">
                        <DJButtons
                            configureDJCheck={handleDJButtons}
                        />
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}
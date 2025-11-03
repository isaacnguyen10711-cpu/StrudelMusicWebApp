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
import TextEditor from './components/TextEditor';


//Test comments

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export function ProcAndPlay() {
/*    if (globalEditor != null && globalEditor.repl.state.started === true) {*/
        console.log(globalEditor)
        Proc()
        globalEditor.evaluate();
    }
//}

export function Proc() {
    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
    ProcessText(proc_text);
    globalEditor.setCode(proc_text_replaced)
}


export function ProcessText(match, ...args) {

    //let replace = ""
    //if (document.getElementById('flexRadioDefault2').checked) {
    //    replace = "_"
    //}

    //return replace
}

export function SetNewCpm(newCpm) {
    let proc_text = document.getElementById('proc').value;
    // Find if there is a phrase called setcpm() in the textarea
    let findCpm = proc_text.includes("setcpm(");
    console.log("Found CPM: " + findCpm)
    // A regular expression to find and match the setcpm command in the strudel text editor
    const regex = /setcpm\(.*\)/g;
    if (findCpm) {
        proc_text = proc_text.replaceAll(regex, `setcpm(${newCpm})`)
    }
    else {
        proc_text = `setcpm(${newCpm})\n` + proc_text;
        console.log("No setcpm command found")

    }
    document.getElementById('proc').value = proc_text;
    globalEditor.setCode(proc_text);
}

export function 

export default function StrudelDemo() {

    // Setting up states to react to changes when users click on buttons
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPreprocessing, setIsPreprocessing] = useState(false);

    //Set cpm function using state
    const [cpm, setCpm] = useState(30);

    // Set hide or open text area using states
    const [textAreaIsOpen, setTextAreaIsOpen] = useState(false);
    const [textEditorIsOpen, setTextEditorIsOpen] = useState(false);

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

    // React-styled function to handle preprocess and play button
    const handleProcesAndPlay = () => {
        if (globalEditor) {
            ProcAndPlay();
            setIsPreprocessing(true);
            setIsPlaying(true);
        }
    }

    const handleCpmChange = (newCpm) => {
        if (!isNaN(newCpm) || newCpm.includes("/")) {
            SetNewCpm(newCpm)
            setCpm(newCpm);
        }
        else {
            setCpm("CPM not applicable");

        }
        if (isPlaying) {
            globalEditor.evaluate();
        }
    }

    const handleTextAreaToggle = () => {
        if (textAreaIsOpen) {
            setTextAreaIsOpen(false)
        }
        else {
            setTextAreaIsOpen(true);
        }
    }

    const handleTextEditorToggle = () => {
        if (textEditorIsOpen) {
            setTextEditorIsOpen(false)
        }
        else {
            setTextEditorIsOpen(true);
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
    <div className="App">
        <h2 className="">Strudel Music </h2>
        <main>
            <div className="container-fluid">
                <div className="row mb-3 justify-content-center">
                    <PlayButtons
                        playClick={handlePlay}
                        stopClick={handleStop}
                        isPlaying={isPlaying}
                    /> 
                </div>

                <div className="row mb-3">
                        <PreprocessButtons
                            preprocessClick={handlePreprocess}
                            preprocessAndPlayClick={handleProcesAndPlay}
                            isPreprocessing={isPreprocessing}
                        />
                </div>
                    <div className="row">
                        <div className="col-4">
                            <DJButtons
                                changeCpm={handleCpmChange}
                                displayCpm={cpm}
                            />
                        </div>
                    </div>

                <div className="row mb-4">
                        <TextToProcess
                            isOpen={textAreaIsOpen}
                            toggle={handleTextAreaToggle}
                    />
                </div>
                <div className="row">
                    <TextEditor
                        isOpen={textEditorIsOpen}
                        toggle={handleTextEditorToggle}
                    />
                </div>

            </div>

            <canvas id="roll"></canvas>
        </main>
    </div>
);


}
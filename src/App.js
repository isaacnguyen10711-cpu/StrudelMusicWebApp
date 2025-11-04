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
import Instruments from './components/Instruments';
import PlayButtons from './components/PlayButtons';
import PreprocessButtons from './components/PreprocessButtons';
import TextToProcess from './components/TextToProcess';
import TextEditor from './components/TextEditor';
import CpmAndEffects from './components/CpmAndEffects';
import VolumeControls from './components/VolumeControls';


//Test comments

let globalEditor = null;

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


export function SetNewCpm(procText, setProcText, newCpm) {
    // Find if there is a phrase called setcpm() in the textarea
    let findCpm = procText.includes("setcpm(");
    console.log("Found CPM: " + findCpm)
    // A regular expression to find and match the setcpm command in the strudel text editor
    const regex = /setcpm\(.*\)/g;
    if (findCpm) {
        var updatedText = procText.replaceAll(regex, `setcpm(${newCpm})`)
    }
    else {
        procText = `setcpm(${newCpm})\n` + procText;
        console.log("No setcpm command found")

    }
    setProcText(updatedText);
    globalEditor.setCode(updatedText);
}

// A function to collect all the instruments existing in the text box
export function CreateInstrumentList(procText) {
    // Created a regex to match which ever instrument that starts with instrumental can be used with the radio buttons
    const regex = /^\s*instrumental_(.*):/gm;

    // Find the instruments and convert it to an array
    const instrumentListRaw = Array.from(procText.matchAll(regex));
    console.log("Instrumental List Raw: " + instrumentListRaw);
    // Convert the raw array to a new array with only the instruments name
    const instrumentList = instrumentListRaw.map(i => i[1]);
    console.log("Instrumental List: " + instrumentList)
    return instrumentList;
}

// Use the default value list of the instruments which is "true" to switch them individually with index value
export function PlayInstrumentToggle(index, instrumentIsPlayingList, instrumentList, procText, setInstrumentIsPlayingList) {
    // Copy current states of the switches to a new list to adjust
    var newStates = [];
    for (let i = 0; i < instrumentIsPlayingList.length; i++) {
        newStates[i] = instrumentIsPlayingList[i];
    }
    // Turn on or off the switches individually
    newStates[index] = !instrumentIsPlayingList[index]
    setInstrumentIsPlayingList(newStates)

    var instrument = instrumentList[index];
    var updatedText = procText;
    if (newStates[index] === true) {
        updatedText = updatedText.replaceAll("_instrumental_" + instrument, "instrumental_" + instrument)

    }
    else {
        updatedText = procText.replaceAll("instrumental_" + instrument, "_instrumental_" + instrument)
    }
    return updatedText
}


// A function that adds the new instruments found after the user changes the text area
export function NewInstrument(newText, instrumentList, instrumentIsPlayingList) {
    var newInstruments = CreateInstrumentList(newText);
    var newInstrumentList = [];
    var newInstrumentIsPlayingList = [];

    for (let i = 0; i < instrumentList.length; i++) {
        newInstrumentList[i] = instrumentList[i];
    }
    for (let i = 0; i < instrumentIsPlayingList.length; i++) {
        newInstrumentIsPlayingList[i] = instrumentIsPlayingList[i];
    }

    // Add the new instrments to the current list state if they havent existed yet
    newInstruments.forEach((instrument) => {
        if (newInstrumentList.includes(instrument)) {
            console.log(`${instrument} already exists`)
        }
        else {
            newInstrumentList.push(instrument)
            newInstrumentIsPlayingList.push(true)
        }
    });

    var updatedInstrumentList = []
    var updatedInstrumentIsPlayingList = [];

    // Remove the instruments that have been deleted 
    newInstrumentList.forEach((instrument) => {
        if (!newInstruments.includes(instrument)) {
            console.log(`${instrument} have been removed`)
        }
        else {
            updatedInstrumentList.push(instrument)
            updatedInstrumentIsPlayingList.push(true)
        }
    });
    return {
        updatedInstrumentList: updatedInstrumentList,
        updatedInstrumentIsPlayingList: updatedInstrumentIsPlayingList
    }
}


export default function StrudelDemo() {

    const [procText, setProcText] = useState(stranger_tune);

    // Setting up states to react to changes when users click on buttons
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPreprocessing, setIsPreprocessing] = useState(false);

    //Set cpm function using state
    const [cpm, setCpm] = useState(30);

    // Set hide or open text area using states
    const [textAreaIsOpen, setTextAreaIsOpen] = useState(false);
    const [textEditorIsOpen, setTextEditorIsOpen] = useState(false);

    const [instrumentList, setInstrumentList] = useState([]);
    const [instrumentIsPlayingList, setInstrumentIsPlayingList] = useState([])


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
        Proc(procText, setProcText);
        handleNewInstrument(procText)
        setIsPreprocessing(true);
    }

    // React-styled function to handle preprocess and play button
    const handleProcesAndPlay = () => {
        if (globalEditor) {
            ProcAndPlay(procText, setProcText);
            handleNewInstrument(procText)
            setIsPreprocessing(true);
            setIsPlaying(true);
        }
    }

    // React handler that changes the CPM state when the user enters a new value
    const handleCpmChange = (newCpm) => {
        if (!isNaN(newCpm) || newCpm.includes("/")) {
            SetNewCpm(procText, setProcText, newCpm)
            setCpm(newCpm);
        }
        else {
            setCpm("CPM not applicable");

        }
        if (isPlaying) {
            globalEditor.evaluate();
        }
    }

    const handleCpmChangeButtons = () => {

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

    // A handler to handle the playInstrumentToggle 
    const handlePlayInstrumentToggle = (index) => {
        if (!globalEditor) {
            console.log("globalEditor has not initiated ye")
            return;
        }
        var updatedText = PlayInstrumentToggle(index, instrumentIsPlayingList, instrumentList, procText, setInstrumentIsPlayingList)
        setProcText(updatedText);
        globalEditor.setCode(updatedText);
        if (isPlaying) {
            ProcAndPlay(updatedText, setProcText);
        }
        
    }
    // A handler that adds new instruments found or delete the ones that have been removed after the user changes the text area
    const handleNewInstrument = (newText) => {
        var { updatedInstrumentList, updatedInstrumentIsPlayingList } = NewInstrument(newText, instrumentList, instrumentIsPlayingList);

        setInstrumentIsPlayingList(updatedInstrumentIsPlayingList)
        setInstrumentList(updatedInstrumentList)
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

        Proc(procText, setProcText)
        setInstrumentList(CreateInstrumentList(procText))

        // A new array to push "true" to all instrument states
        const defaultStates = [];
        for (let i = 0; i < CreateInstrumentList(procText).length; i++) {
            defaultStates.push(true);
        }
        setInstrumentIsPlayingList(defaultStates)
    }

}, []);


return (
    <div className="App">
        <h2 className="">Strudel Music </h2>
        <main>
            <div className="container-fluid">
                <div className="row mb-2 justify-content-center">
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
                        <CpmAndEffects
                            changeCpm={handleCpmChange}
                            displayCpm={cpm}
                        />
                    </div>
                        <div className="col-4">
                        <Instruments
                            instrumentalList={instrumentList}
                            instrumentIsPlaying={instrumentIsPlayingList}
                            toggleInstrument={handlePlayInstrumentToggle}
                            />
                    </div>
                    <div className="col-4">
                        <VolumeControls
                        />
                    </div>
                    </div>

                <div className="row mb-4">
                    <TextToProcess
                        text={procText}
                        setProcText={setProcText}
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
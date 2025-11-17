import { globalEditor } from "../App";
import { ProcAndPlay } from "../App";
import { useState, useEffect } from "react";

const AudioEffects = ({ procText, setProcText, isPlaying }) => {

    const [reverb, setReverb] = useState(0)
    const [delay, setDelay] = useState(0)

    const applyReverb = (reverbValue) => {
        var reverbMaster = `all(x => x.room(${reverbValue}))`;
        // using regex to find the postgain() command
        const regex = /all\(x => x\.room\(.*\)\)/gs
        var newText = procText
        // set 2 conditions if found or not found the postgain() command
        let findReverb = newText.includes("all(x => x.room(");
        if (findReverb) {
            newText = newText.replaceAll(regex, reverbMaster)
        }
        else {
            newText = newText + "\n" + reverbMaster
        }
        // set the text and the editor with the new text after changing volume
        setProcText(newText)
        globalEditor.setCode(newText)
    }

    const applyDelay = (delayValue) => {
        var delayMaster = `all(x => x.delay(${delayValue}))`;
        // using regex to find the postgain() command
        const regex = /all\(x => x\.delay\(.*\)\)/gs
        var newText = procText
        // set 2 conditions if found or not found the postgain() command
        let findDelay = newText.includes("all(x => x.delay(");
        if (findDelay) {
            newText = newText.replaceAll(regex, delayMaster)
        }
        else {
            newText = newText + "\n" + delayMaster
        }
        // set the text and the editor with the new text after changing volume
        setProcText(newText)
        globalEditor.setCode(newText)
    }

    const handleReverb = () => {
        if (reverb == 0) {
            setReverb(1)
            applyReverb(1)
            if (isPlaying) {
                globalEditor.evaluate();
            }
        }
        else {
            setReverb(0)
            applyReverb(0)
            if (isPlaying) {
                globalEditor.evaluate();
            }
        }

    }

    const handleReverbIncrease = () => {
        var newReverb = Math.round((reverb + 0.1) * 10) / 10
        if (reverb < 2) {
            setReverb(newReverb)
            applyReverb(newReverb)
        }
        else {
            alert("Cannot apply reverb > 2")
        }
        if (isPlaying) {
            globalEditor.evaluate();
        }

    }

    const handleReverbDecrease = () => {
        var newReverb = Math.round((reverb - 0.1) * 10) / 10
        if (reverb > 0) {
            setReverb(newReverb)
            applyReverb(newReverb)
        }
        else {
            alert("Cannot apply reverb < 0")
        }
        if (isPlaying) {
            globalEditor.evaluate();
        }

    }

    const handleDelay = () => {
        if (delay == 0) {
            setDelay(1)
            applyDelay(1)
            if (isPlaying) {
                globalEditor.evaluate();
            }
        }
        else {
            setDelay(0)
            applyDelay(0)
            if (isPlaying) {
                globalEditor.evaluate()
            }
        }

    }

    const handleDelayIncrease = () => {
        var newDelay = Math.round((delay + 0.1) * 10) / 10
        if (delay < 2) {
            setDelay(newDelay)
            applyDelay(newDelay)
        }
        else {
            alert("Cannot apply delay > 2")
        }
        if (isPlaying) {
            globalEditor.evaluate();
        }

    }

    const handleDelayDecrease = () => {
        var newDelay = Math.round((delay - 0.1) * 10) / 10
        if (delay > 0) {
            setDelay(newDelay)
            applyDelay(newDelay)
        }
        else {
            alert("Cannot apply delay < 0")
        }
        if (isPlaying) {
            globalEditor.evaluate();
        }

    }

    return (
        <>
            <div className="row mb-4 text-center">
                <label style={{ marginLeft: "-20px" }} className="form-label fs-5 fw-bold mb-2">AUDIO EFFECTS </label>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <button style={{ width: "40px", height: "40px" }} onClick={handleReverbIncrease} className="btn btn-outline-primary " type="button">+</button>
                    <button style={{ width: "40px", height: "40px", marginRight: "20px" }} onClick={handleReverbDecrease} className="btn btn-outline-danger " type="button">-</button>
                    <button style={{ width: "250px", height: "50px", marginRight: "20px" }} onClick={handleReverb} className="btn btn-outline-light " type="button">REVERB EFFECT</button> 
                    <label style={{ width: "110px", display: "inline-block" }} className=" form-label fs-5">REVERB: {reverb} </label>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <button style={{ width: "40px", height: "40px" }} onClick={handleDelayIncrease} className="btn btn-outline-primary " type="button">+</button>
                    <button style={{ width: "40px", height: "40px", marginRight: "20px" }} onClick={handleDelayDecrease} className="btn btn-outline-danger " type="button">-</button>
                    <button style={{ width: "250px", height: "50px", marginRight: "30px" }} onClick={handleDelay} className="btn btn-outline-light " type="button">DELAY EFFECT</button>
                    <label style={{ width: "100px", display: "inline-block" }} className=" form-label fs-5">DELAY: {delay} </label>
                </div>
            </div>

        </>
    )
};
export default AudioEffects;
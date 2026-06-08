import { globalEditor } from "../App";


const AudioEffects = ({ reverb, setReverb, delay, setDelay, procText, setProcText, isPlaying }) => {

    const applyReverb = (reverbValue) => {
        var reverbMaster = `all(x => x.room(${reverbValue}))`;
        // using regex to find the reverb() command
        const regex = /all\(x => x\.room\(.*\)\)/gs
        var newText = procText
        // set 2 conditions if found or not found the reverb() command
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
        // using regex to find the delay() command
        const regex = /all\(x => x\.delay\(.*\)\)/gs
        var newText = procText
        // set 2 conditions if found or not found the delay() command
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
        // Turn on and off the effect
        if (reverb === 0) {
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
        // Round the value since js does not handle decimal numbers well
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
        // Turn on and off delay effect
        if (delay === 0) {
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
        // Round the value since js does not handle decimal numbers well
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
            <div className="row mb-3 text-center">
                <p className="fs-5 fw-bold ">AUDIO EFFECTS</p>
            </div>

            <div className="row mb-4">
                <div className="col effect-control">
                {/*Apply inline styling to make sure when the reverb or delay value changes, same layout is still kept*/}
                    <button onClick={handleReverbIncrease} className="btn btn-outline-primary effect-stepper" type="button">+</button>
                    <button onClick={handleReverbDecrease} className="btn btn-outline-danger effect-stepper" type="button">-</button>
                    <button onClick={handleReverb} className="btn btn-outline-light effect-button" type="button">REVERB EFFECT</button> 
                    <label className="form-label fs-5 effect-value">REVERB: {reverb} </label>
                </div>
            </div>

            <div className="row">
                <div className="col effect-control">
                    <button onClick={handleDelayIncrease} className="btn btn-outline-primary effect-stepper" type="button">+</button>
                    <button onClick={handleDelayDecrease} className="btn btn-outline-danger effect-stepper" type="button">-</button>
                    <button onClick={handleDelay} className="btn btn-outline-light effect-button" type="button">DELAY EFFECT</button>
                    <label className="form-label fs-5 effect-value">DELAY: {delay} </label>
                </div>
            </div>

        </>
    )
};
export default AudioEffects;

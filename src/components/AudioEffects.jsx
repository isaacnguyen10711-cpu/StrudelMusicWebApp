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
                <p style={{ marginLeft: "-20px" }} className="fs-5 fw-bold ">AUDIO EFFECTS</p>
            </div>

            <div className="row mb-4">
                <div className="col">
                {/*Apply inline styling to make sure when the reverb or delay value changes, same layout is still kept*/}
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
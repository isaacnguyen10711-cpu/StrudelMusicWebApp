import { globalEditor } from "../App";


const VolumeControls = ({ volume, setVolume, procText, setProcText, isPlaying }) => {

    const changeVolume = (newVolume) => {
        var volumeMaster = `all(x => x.postgain(${newVolume}))`;
        // using regex to find the postgain() command
        const regex = /all\(x => x\.postgain\(.*\)\)/gs
        var newText = procText
        // set 2 conditions if found or not found the postgain() command
        let findVolume = newText.includes("all(x => x.postgain(");
        if (findVolume) {
            newText = newText.replaceAll(regex, volumeMaster)
        }
        else {
            newText = newText + "\n" + volumeMaster
        }
        // set the text and the editor with the new text after changing volume
        setProcText(newText)
        globalEditor.setCode(newText)
    }

    const handleVolumeChange = (volume) => {
        setVolume(volume)
        changeVolume(volume / 4)
        if (isPlaying) {
            globalEditor.evaluate();
        }   
    }

    // Reset volume to the beginning
    const resetVolume = () => {
        const regex = /all\(x => x\.postgain\(.*\)\)/gs
        var newText = procText
        let findVolume = newText.includes("all(x => x.postgain(");
        if (findVolume) {
            newText = newText.replaceAll(regex, '')
            setVolume(10)
        }
        setProcText(newText)
        globalEditor.setCode(newText)
        if (isPlaying) {
            globalEditor.evaluate();
        } 
    }

    return (
        <>
            <div>
                <p className="fs-5 fw-bold ">Volume: {volume}</p>
                {/*// Add max volume as 20*/}
                <input type="range" min="0" max="20" step="1" className="form-range" value={volume}
                    onChange={(e) => {
                        handleVolumeChange(Number(e.target.value))
                    }} />
                <button onClick={resetVolume} className="btn btn-outline-light mt-2">RESET VOLUME</button>
            </div>

        </>
    )
};
export default VolumeControls;
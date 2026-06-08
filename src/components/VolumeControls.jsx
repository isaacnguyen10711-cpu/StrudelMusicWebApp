import { globalEditor } from "../App";


const VolumeControls = ({ volume, setVolume, procText, setProcText, isPlaying }) => {

    const volumeRegex = /^all\(x => x\.velocity\([^)]*\)\)\s*$/gm;
    const oldPostgainVolumeRegex = /^all\(x => x\.postgain\([^)]*\)\)\s*$/gm;

    const updateEditor = (newText) => {
        setProcText(newText)
        if (globalEditor) {
            globalEditor.setCode(newText)
            if (isPlaying) {
                globalEditor.evaluate();
            }
        }
    }

    const changeVolume = (newVolume) => {
        var volumeMaster = `all(x => x.velocity(${newVolume}))`;
        var newText = procText.replace(oldPostgainVolumeRegex, '').trimEnd()

        if (volumeRegex.test(newText)) {
            newText = newText.replace(volumeRegex, volumeMaster)
        }
        else {
            newText = newText + "\n" + volumeMaster
        }

        updateEditor(newText)
    }

    const handleVolumeChange = (volume) => {
        setVolume(volume)
        changeVolume(volume / 20)
    }

    // Reset volume to the beginning
    const resetVolume = () => {
        const newText = procText.replace(volumeRegex, '').replace(oldPostgainVolumeRegex, '').trimEnd()
        setVolume(10)
        updateEditor(newText)
    }

    return (
        <>
            <div>
                <p style={{ marginBottom: "10px" }} className="fs-5 fw-bold ">Volume: {volume}</p>
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

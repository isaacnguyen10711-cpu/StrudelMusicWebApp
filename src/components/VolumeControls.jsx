import { globalEditor } from "../App";
import { ProcAndPlay } from "../App";
import { useState, useEffect } from "react";

const VolumeControls = ({ procText, setProcText, isPlaying }) => {

    const [volume, setVolume] = useState(10)

    const changeVolume = (newVolume) => {
        var volumeMain = `all(x => x.postgain(${newVolume}))`;
        const regex = /all\(x => x\.postgain\(.*\)\)/gs
        var newText = procText

        let findVolume = procText.includes("all(x => x.postgain(");
        if (findVolume) {
            newText = newText.replaceAll(regex, volumeMain)
        }
        else {
            newText = newText + "\n" + volumeMain
        }

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

    return (
        <>
            <div>
                <label className="form-label fs-5 fw-bold mb-2">VOLUME: {volume}</label>
                <input type="range" min="0" max="20" step="1" className="form-range" value={volume}
                    onChange={(e) => {
                        handleVolumeChange(Number(e.target.value))
                        }} />
                </div>

        </>
    )
};
export default VolumeControls;
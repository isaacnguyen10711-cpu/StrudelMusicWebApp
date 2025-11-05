import { globalEditor } from "../App";
import { ProcAndPlay } from "../App";

const Instruments = ({ procText, setProcText, instrumentIsPlayingList, setInstrumentIsPlayingList, instrumentList, isPlaying }) => {
    // Use the default value list of the instruments which is "true" to switch them individually with index value
    function PlayInstrumentToggle(index, instrumentIsPlayingList, instrumentList, procText, setInstrumentIsPlayingList) {
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

    return (
        <>
            {instrumentList.length > 0 && (
                instrumentList.map((instrument, index) => (
                    <div key={index} className="form-check form-switch mb-2">
                        <input className="form-check-input mt-4" style={{ marginLeft: "120px" }} type="checkbox" checked={instrumentIsPlayingList[index]} onChange={() => handlePlayInstrumentToggle(index)} />
                        <label className="form-check-label fs-5 fw-bold mt-3" style={{ marginRight: "100px" }} htmlFor={instrument}>{instrument}</label>
                    </div>
                ))
            )}
            
            
    </>
  );
}

export default Instruments;
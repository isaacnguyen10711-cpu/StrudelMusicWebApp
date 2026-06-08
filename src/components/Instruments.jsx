import { globalEditor } from "../App";


const Instruments = ({ procText, setProcText, instrumentIsPlayingList, setInstrumentIsPlayingList, instrumentList, isPlaying }) => {
    // Use the default value list of the instruments which is "true" to switch them individually with index value
    function PlayInstrumentToggle(index, instrumentIsPlayingList, instrumentList, procText, setInstrumentIsPlayingList) {
        // Copy current states of the switches to a new list to adjust
        var newStates = [];
        for (var i = 0; i < instrumentIsPlayingList.length; i++) {
            newStates[i] = instrumentIsPlayingList[i];
        }
        // Turn on or off the switches individually (!true means false)
        newStates[index] = !instrumentIsPlayingList[index]
        setInstrumentIsPlayingList(newStates)

        var instrument = instrumentList[index];
        var updatedText = procText;
        if (newStates[index] === true) {
            updatedText = updatedText.replaceAll("_instrumental_" + instrument, "instrumental_" + instrument)

        }
        else {
            updatedText = updatedText.replaceAll("instrumental_" + instrument, "_instrumental_" + instrument)
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
            globalEditor.evaluate();
        }

    }

    return (
        <>
            {instrumentList.length > 0 && (
                instrumentList.map((instrument, index) => (
                    <div key={index} className="form-check form-switch instrument-toggle">
                        <input className="form-check-input" id={`instrument-${instrument}`} type="checkbox" checked={instrumentIsPlayingList[index]} onChange={() => handlePlayInstrumentToggle(index)} />
                        <label className="form-check-label fs-5 fw-bold" htmlFor={`instrument-${instrument}`}>{instrument}</label>
                    </div>
                ))
            )}
            
            
    </>
  );
}

export default Instruments;

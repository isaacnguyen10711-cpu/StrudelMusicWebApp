import { globalEditor } from "../App";
import { ProcAndPlay } from "../App";
import { useState } from "react";

const VolumeControls = ({ instrumentList }) => {

    const [instrumentVolumeList, setInstrumentVolumeList] = useState({})

    // a forEach loop to set the beginning value of each instrument
    instrumentList.forEach((instrument) => {
    if (!(instrument in instrumentVolumeList)) {
        instrumentVolumeList[instrument] = 5;
    }
    })

    return (
        <>
            {instrumentList.map((instrument) => (
                <div key={instrument}>
                    <label htmlFor={instrument} className="form-label fs-5 fw-bold ">{instrument} Volume: {instrumentVolumeList[instrument]}</label>
                    <input type="range" min="0" max="10" step="1" className="form-range" id={instrument} value={instrumentVolumeList[instrument]}
                        onChange={(e) => {
                            // parse the value since its a string
                            instrumentVolumeList[instrument] = parseFloat(e.target.value)
                            // A new empty list which copies the volume value when the user changes the slider
                            var updatedInstrumentVolumeList = {}
                            for (var instrumentName in instrumentVolumeList) {
                                updatedInstrumentVolumeList[instrumentName] = instrumentVolumeList[instrumentName]
                            }
                            // re render the page to see the updated values
                            setInstrumentVolumeList(updatedInstrumentVolumeList)
                        }} />
                </div>
            ) )}

        </>
    )
};
export default VolumeControls;
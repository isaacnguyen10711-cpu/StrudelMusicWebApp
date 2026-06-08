import { globalEditor } from "./App.js";

const LoadAndSaveSettings = ({ procText, setProcText, instrumentList, setInstrumentList,
    instrumentIsPlayingList, setInstrumentIsPlayingList }) => {

    const SaveCurrentSettings = () => {
        const settings = { procText, instrumentList, instrumentIsPlayingList }
        // Use localStorage.setItem to save the JSON file into the local storage of the browser with the name "StrudelMusicAppSettings"
        localStorage.setItem("StrudelMusicAppSettings", JSON.stringify(settings))
        alert("Current audio settings successfully saved as 'StrudelMusicAppSettings'")
    }

    const LoadExistedSettings = () => {
        // Get the saved json file
        const existedSettings = localStorage.getItem("StrudelMusicAppSettings")
        if (!existedSettings) {
            alert("No existed settings found")
            // exit the function if no settings with the name "StrudelMusicAppSettings" found
            return;
        }
        // parse the json file to so it can read
        const settings = JSON.parse(existedSettings)

        // Check all conditions to see if they exists or not
        // Use undefined for proctext since it might be an empty string
        if (settings.procText !== undefined) {
            setProcText(settings.procText)
            globalEditor.setCode(settings.procText)
        }
        if (settings.instrumentList != null) {
            setInstrumentList(settings.instrumentList)
        }
        if (settings.instrumentIsPlayingList != null) {
            setInstrumentIsPlayingList(settings.instrumentIsPlayingList)
        }
        alert("'StrudelMusicAppSettings' successfully loaded")
        
    }

    return (
        <>
            <div className="settings-actions">
                <button onClick={SaveCurrentSettings} className='btn btn-outline-success fw-bold settings-button'>SAVE</button>
                <button onClick={LoadExistedSettings} className='btn btn-outline-info fw-bold settings-button'>LOAD</button>
            </div>

        </>
    )


}

export default LoadAndSaveSettings

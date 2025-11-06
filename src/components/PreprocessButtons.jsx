import { globalEditor } from "../App";
import { Proc, ProcAndPlay, CreateInstrumentList } from "../App";


const ProcessButtons = ({ procText, setProcText, instrumentList, instrumentIsPlayingList, setInstrumentList, setInstrumentIsPlayingList,
    setIsPreprocessing, setIsPlaying }) => {

    // A function that adds the new instruments found after the user changes the text area
    function NewInstrument(newText, instrumentList, instrumentIsPlayingList) {
        var newInstruments = CreateInstrumentList(newText);
        var newInstrumentList = [];
        var newInstrumentIsPlayingList = [];

        // Add the new instruments to the current list state if they havent existed yet
        newInstruments.forEach((instrument) => {
            var existingInstrumentIndex = instrumentList.indexOf(instrument)
            if (existingInstrumentIndex !== -1) {
                newInstrumentList.push(instrument)
                newInstrumentIsPlayingList.push(instrumentIsPlayingList[existingInstrumentIndex])
                console.log(`${instrument} already exists`)
            }
            else {
                newInstrumentList.push(instrument)
                newInstrumentIsPlayingList.push(true)
            }
        });

        return {
            updatedInstrumentList: newInstrumentList,
            updatedInstrumentIsPlayingList: newInstrumentIsPlayingList
        }
    }

    // A handler that adds new instruments found or delete the ones that have been removed after the user changes the text area
    const handleNewInstrument = (newText) => {
        var { updatedInstrumentList, updatedInstrumentIsPlayingList } = NewInstrument(newText, instrumentList, instrumentIsPlayingList);

        setInstrumentIsPlayingList(updatedInstrumentIsPlayingList)
        setInstrumentList(updatedInstrumentList)
    }


    // React-styled function to handle preprocess button
    const handlePreprocess = () => {
        Proc(procText, setProcText);
        handleNewInstrument(procText)
        setIsPreprocessing(true);
    }

    // React-styled function to handle preprocess and play button
    const handleProcesAndPlay = () => {
        if (globalEditor) {
            ProcAndPlay(procText, setProcText);
            handleNewInstrument(procText)
            setIsPreprocessing(true);
            setIsPlaying(true);
        }
    }

    return (
        <>
            <div className="row justify-content-center" style={{ marginLeft: "2px" }}>
                <div className="col-auto">
                    <button onClick={handlePreprocess} id="process" className="btn btn-outline-primary fs-5">Preprocess</button>
                </div>
                <div className="col-auto">
                    <button onClick={handleProcesAndPlay} id="process_play" className="btn btn-outline-primary fs-5">Proc & Play</button>
                </div>
            </div>

    </>
  );
}

export default ProcessButtons;
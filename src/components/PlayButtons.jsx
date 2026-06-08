import { globalEditor } from "../App";

const PlayButtons = ({ isPlaying, setIsPlaying }) => {

    // React-styled function to handle play button
    const handlePlay = () => {
        if (globalEditor) {
            globalEditor.evaluate();
            setIsPlaying(true); 
        }
    }

    // React-styled function to handle stop button
    const handleStop = () => {
        if (globalEditor) {
            globalEditor.stop();
            setIsPlaying(false);
        }
    }

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-auto">
                    {isPlaying ? <button onClick={handleStop} id="stop" className="btn play-toggle-button">
                        <i className="bi bi-pause-circle-fill text-danger"></i>
                    </button>
                        : <button onClick={handlePlay} id="play" className="btn play-toggle-button">
                            <i className="bi bi-play-circle-fill text-success"></i>
                        </button>}
                    
                </div>
            </div>
    </>
  );
}

export default PlayButtons;

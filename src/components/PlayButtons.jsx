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
                    {isPlaying ? <button style={{ marginTop: "-40px" }} onClick={handleStop} id="stop" className="btn">
                        <i className="bi bi-pause-circle-fill text-danger" style={{ fontSize: "100px" }}></i>
                    </button>
                        : <button style={{ marginTop: "-40px" }} onClick={handlePlay} id="play" className="btn">
                            <i className="bi bi-play-circle-fill text-success" style={{ fontSize: "100px" }}></i>
                        </button>}
                    
                </div>
            </div>
    </>
  );
}

export default PlayButtons;
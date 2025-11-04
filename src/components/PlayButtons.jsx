const PlayButtons = ({ playClick, stopClick, isPlaying }) => {
    
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-auto">
                    {isPlaying ? <button onClick={stopClick} id="stop" className="btn">
                        <i className="bi bi-pause-circle-fill text-danger" style={{ fontSize: "100px" }}></i>
                    </button> 
                        : <button onClick={playClick} id="play" className="btn">
                            <i className="bi bi-play-circle-fill text-success" style={{ fontSize: "100px" }}></i>
                        </button>}
                    
                </div>
            </div>
    </>
  );
}

export default PlayButtons;
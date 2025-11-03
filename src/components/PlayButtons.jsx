const PlayButtons = ({ playClick, stopClick, isPlaying }) => {
    let playStatus;
    if (isPlaying) {
        playStatus = "The song is being played"
    }
    
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <button onClick={playClick} id="play" className="btn">
                        <i className="bi bi-play-circle-fill text-success" style={{ fontSize: "70px" }}></i></button>
                </div>
                <div className="col-auto">
                    <button onClick={stopClick} id="stop" className="btn">
                        <i className="bi bi-pause-circle-fill text-danger" style={{fontSize: "70px"}}></i></button>
                </div>
            </div>
            

            <p className="fs-3 fw-bold text-secondary">{playStatus}</p>
    </>
  );
}

export default PlayButtons;
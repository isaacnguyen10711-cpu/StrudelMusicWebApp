const PlayButtons = ({ playClick, stopClick, isPlaying }) => {
    let playStatus;
    if (isPlaying) {
        playStatus = "The song is being played"
    }
    
    return (
        <>
            <button onClick={playClick} id="play" className="btn btn-outline-success">Play</button>
            <button onClick={stopClick} id="stop" className="btn btn-outline-danger">Stop</button>

            <p className="fs-3 fw-bold text-secondary">{playStatus}</p>
    </>
  );
}

export default PlayButtons;
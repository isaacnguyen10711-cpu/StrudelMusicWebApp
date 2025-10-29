function PlayButtons({ playClick, stopClick }) {
    return (
        <>
            <button onClick={playClick} id="play" className="btn btn-outline-primary">Play</button>
            <button onClick={stopClick} id="stop" className="btn btn-outline-primary">Stop</button>
    </>
  );
}

export default PlayButtons;
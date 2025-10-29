function ProcessButtons({ preprocessClick, preprocessAndPlayClick }) {
    return (
        <>
            <button onClick={preprocessClick} id="process" className="btn btn-outline-primary">Preprocess</button>
            <button onClick={preprocessAndPlayClick} id="process_play" className="btn btn-outline-primary">Proc & Play</button>
    </>
  );
}

export default ProcessButtons;
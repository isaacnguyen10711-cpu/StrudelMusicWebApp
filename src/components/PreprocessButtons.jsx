const ProcessButtons = ({ preprocessClick, preprocessAndPlayClick }) => {

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <button onClick={preprocessClick} id="process" className="btn btn-outline-primary fs-5">Preprocess</button>
                </div>
                <div className="col-auto">
                    <button onClick={preprocessAndPlayClick} id="process_play" className="btn btn-outline-primary fs-5">Proc & Play</button>
                </div>
            </div>

    </>
  );
}

export default ProcessButtons;
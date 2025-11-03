const DJButtons = ({ changeCpm, displayCpm }) => {

    return (
        <>
            <p className="fs-5 fw-bold ">Current CPM: {displayCpm}</p>
            <div className="input-group mb-3">
                <input id="cpmUserInput" type="text" className="form-control" placeholder="CPM" aria-label="CPM control" />
                <button onClick={() => {
                    const cpm = document.getElementById("cpmUserInput").value;
                    changeCpm(cpm);
                }} className="btn btn-outline-secondary" type="button" id="button-addon2">Set</button>
            </div>

            <label for="volume" className="form-label fs-5 fw-bold ">Bass Volume</label>
            <input type="range" className="form-range" id="volume" />

            <label for="volume" className="form-label fs-5 fw-bold ">Drums 2 Volume</label>
            <input type="range" className="form-range" id="volume" />

            <label for="volume" className="form-label fs-5 fw-bold ">Drums 3 Volume</label>
            <input type="range" className="form-range" id="volume" />

            <div>
            </div>

            <div className="form-check form-switch">
                <input className="form-check-input " type="checkbox" id="Bassline" />
                <label className="form-check-label fs-5 fw-bold " for="switch1">Bassline</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="Drums 1" />
                <label className="form-check-label fs-5 fw-bold " for="switch2" >Drums 1</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="Drums 2" />
                <label className="form-check-label fs-5 fw-bold mb-4" for="switch3">Drums 2</label>
            </div>
    </>
  );
}

export default DJButtons;
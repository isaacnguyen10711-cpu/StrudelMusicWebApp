const DJButtons = ({ changeCpm }) => {
    const cpm = document.getElementById("cpmUserInput").value;

    return (
      <>
            <div className="input-group mb-3">
                <button className="btn btn-outline-primary" type="button">+</button>
                <button className="btn btn-outline-danger" type="button">-</button>
                <input id="cpmUserInput" type="text" className="form-control" placeholder="CPM" aria-label="CPM control" />
                <button onClick={() => {changeCpm(Number(cpm)) }} className="btn btn-outline-secondary" type="button" id="button-addon2">Set</button>
            </div>

            <label for="volume" className="form-label fs-5 fw-bold text-dark">Volume</label>
            <input type="range" className="form-range" id="volume" />

            <div>
            </div>

            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="switch1" />
                <label className="form-check-label" for="switch1">Default switch checkbox input</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="switch2" />
                <label className="form-check-label" for="switch2">Checked switch checkbox input</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="switch3" />
                <label className="form-check-label" for="switch3">Disabled switch checkbox input</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="switch4" />
                <label className="form-check-label" for="switch4">Disabled checked switch checkbox input</label>
            </div>
    </>
  );
}

export default DJButtons;
const CpmAndEffects = ({ changeCpm, displayCpm }) => {

    return (
        <>
            <p className="fs-5 fw-bold ">CPM: {displayCpm}</p>
            <div className="input-group mb-3">
                <button class="btn btn-outline-primary" type="button">+</button>
                <button class="btn btn-outline-danger" type="button">-</button>
                <input id="cpmUserInput" type="text" className="form-control" placeholder="Enter CPM" aria-label="CPM control" />
                <button onClick={() => {
                    const cpm = document.getElementById("cpmUserInput").value;
                    changeCpm(cpm);
                }} className="btn btn-outline-light" type="button" id="button-addon2">Set</button>
            </div>

        </>
    )
}

export default CpmAndEffects;

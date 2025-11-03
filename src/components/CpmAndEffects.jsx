const CpmAndEffects = ({ changeCpm, displayCpm }) => {

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

        </>
    )
}

export default CpmAndEffects;

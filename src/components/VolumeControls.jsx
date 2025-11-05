
const VolumeControls = () => {


    return (
        <>
            <label htmlFor="volume" className="form-label fs-5 fw-bold ">Bass Volume</label>
            <input type="range" className="form-range" id="volume" />

            <label htmlFor="volume" className="form-label fs-5 fw-bold ">Drums 2 Volume</label>
            <input type="range" className="form-range" id="volume" />

            <label htmlFor="volume" className="form-label fs-5 fw-bold ">Drums 3 Volume</label>
            <input type="range" className="form-range" id="volume" />
        </>
    )
};
export default VolumeControls;
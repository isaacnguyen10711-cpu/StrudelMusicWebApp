
const DJButtons = ({ instrumentalList, instrumentIsPlaying, toggleInstrument }) => {
    return (
        <>
            <label htmlFor="volume" className="form-label fs-5 fw-bold ">Bass Volume</label>
            <input type="range" className="form-range" id="volume" />

            <label htmlFor="volume" className="form-label fs-5 fw-bold ">Drums 2 Volume</label>
            <input type="range" className="form-range" id="volume" />

            <label htmlFor="volume" className="form-label fs-5 fw-bold ">Drums 3 Volume</label>
            <input type="range" className="form-range" id="volume" />

            <div>
            </div>
            {instrumentalList.length > 0 && (
                instrumentalList.map((instrument, index) => (
                    <div key={index} className="form-check form-switch">
                        <input className="form-check-input " type="checkbox" id={`instrument_${index}`} checked={instrumentIsPlaying[index]} onChange={()=> toggleInstrument(index)} />
                        <label className="form-check-label fs-5 fw-bold " htmlFor={instrument}>{instrument}</label>
                    </div>
                ))
            )}
            
            
    </>
  );
}

export default DJButtons;
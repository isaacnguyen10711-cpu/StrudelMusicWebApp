
const Instruments = ({ instrumentalList, instrumentIsPlaying, toggleInstrument }) => {
    return (
        <>
            {instrumentalList.length > 0 && (
                instrumentalList.map((instrument, index) => (
                    <div key={index} className="form-check form-switch mb-2">
                        <input className="form-check-input mt-4" style={{ marginLeft: "120px" }} type="checkbox" checked={instrumentIsPlaying[index]} onChange={() => toggleInstrument(index)} />
                        <label className="form-check-label fs-5 fw-bold mt-3" style={{ marginRight: "100px" }} htmlFor={instrument}>{instrument}</label>
                    </div>
                ))
            )}
            
            
    </>
  );
}

export default Instruments;
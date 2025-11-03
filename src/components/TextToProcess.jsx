const TextToProcess = ({text, isOpen, toggle, setProcText }) => {
    return (
      <>
            <h4 htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess</h4>
            <details open={isOpen} onToggle={toggle}>
                <summary className="border rounded shadow-sm mb-3">{isOpen ? <h5>Hide Text Area</h5> : <h5>Open Text Area</h5>}</summary>
                <textarea className="form-control" rows="15" value={text} onChange={(e) => setProcText(e.target.value)} ></textarea>
            </details>
        </>
  );
}

export default TextToProcess;
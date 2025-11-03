const TextToProcess = ({isOpen, toggle }) => {
    return (
      <>
            <h4 htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess</h4>
            <details open={isOpen} onToggle={toggle}>
                <summary className="border rounded shadow-sm mb-3">{isOpen ? <h5>Hide Text Area</h5> : <h5>Open Text Area</h5>}</summary>
                <textarea className="form-control" rows="15" id="proc"></textarea>
            </details>
        </>
  );
}

export default TextToProcess;
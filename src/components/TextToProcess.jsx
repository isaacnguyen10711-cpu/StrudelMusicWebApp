const TextToProcess = ({ procText, setProcText, textAreaIsOpen, setTextAreaIsOpen }) => {

    const handleTextAreaToggle = () => {
        if (textAreaIsOpen) {
            setTextAreaIsOpen(false)
        }
        else {
            setTextAreaIsOpen(true);
        }
    }

    return (
        <>
            <h4 style={{ marginTop: "10px" }} htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess</h4>
            <details open={textAreaIsOpen} onToggle={handleTextAreaToggle}>
                <summary className="border rounded shadow-sm mb-3">{textAreaIsOpen ? <h5>Hide Text Area</h5> : <h5>Open Text Area</h5>}</summary>
                <textarea className="form-control" rows="15" value={procText} onChange={(e) => setProcText(e.target.value)} ></textarea>
            </details>
        </>
  );
}

export default TextToProcess;
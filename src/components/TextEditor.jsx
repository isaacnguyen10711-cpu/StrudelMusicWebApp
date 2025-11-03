const TextEditor = ({isOpen, toggle }) => {
    return (
        <>
            <h4 htmlFor="exampleFormControlTextarea1" className="form-label">Text Editor</h4>
            <details open={isOpen} onToggle={toggle}>
                <summary className="border rounded shadow-sm mb-3"> {isOpen ? <h5>Hide Text Editor</h5> : <h5>Open Text Editor</h5>}
                </summary>
                <div className="form-control" rows="15" id="editor"></div>
                <div id="output"></div>
            </details>
        </>
    );
}

export default TextEditor;
import { useState } from "react";

const TextEditor = () => {

    const [textEditorIsOpen, setTextEditorIsOpen] = useState(false);
    const handleTextEditorToggle = () => {
        if (textEditorIsOpen) {
            setTextEditorIsOpen(false)
        }
        else {
            setTextEditorIsOpen(true);
        }
    }

    return (
        <>
            <h4 htmlFor="exampleFormControlTextarea1" className="form-label">Text Editor</h4>
            <details open={textEditorIsOpen} onToggle={handleTextEditorToggle}>
                <summary className="border rounded shadow-sm mb-3"> {textEditorIsOpen ? <h5>Hide Text Editor</h5> : <h5>Open Text Editor</h5>}
                </summary>
                <div className="form-control" rows="15" id="editor"></div>
                <div id="output"></div>
            </details>
        </>
    );
}

export default TextEditor;

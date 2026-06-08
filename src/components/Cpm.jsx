import { globalEditor } from "../App";
import { useEffect, useState } from "react";

const Cpm = ({ procText, setProcText, isPlaying }) => {

    const [cpm, setCpm] = useState(30);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        const cpmMatch = procText.match(/setcpm\(([^)]*)\)/);
        if (cpmMatch) {
            const parsedCpm = Number(cpmMatch[1]);
            setCpm(Number.isNaN(parsedCpm) ? cpmMatch[1] : parsedCpm);
        }
    }, [procText]);


    // A function that finds the text setcpm() in the text area and change the nummber inside the () based on input
    function SetNewCpm(procText, setProcText, newCpm) {
        // Find if there is a phrase called setcpm() in the textarea
        let findCpm = procText.includes("setcpm(");
        console.log("Found CPM: " + findCpm)
        // A regular expression to find and match the setcpm command in the strudel text editor
        const regex = /setcpm\(.*\)/g;
        if (findCpm) {
            var updatedText = procText.replaceAll(regex, `setcpm(${newCpm})`)
        }
        else {
            updatedText = `setcpm(${newCpm})\n` + procText;
            console.log("No setcpm command found")

        }
        setProcText(updatedText);
        globalEditor.setCode(updatedText);
    }

    // React handler that changes the CPM state when the user enters a new value
    const handleCpmChange = (newCpm) => {
        if (newCpm < 1 || newCpm > 70) {
            alert("CPM has to be between 1 and 70")
        }
        else {
            if (!isNaN(newCpm) || newCpm.includes("/")) {
                SetNewCpm(procText, setProcText, newCpm)
                setCpm(newCpm);
            }
            else {
                setCpm("CPM not applicable");

            }
            if (isPlaying) {
                globalEditor.evaluate();
            }
        }
    }

    const handleCpmIncrease = () => {
        var newCpm = cpm + 1
        if (newCpm < 1 || newCpm > 70) {
            alert("CPM has to be between 1 and 70")
        }
        else {
            setCpm(newCpm)
            SetNewCpm(procText, setProcText, newCpm)
            if (isPlaying) {
                globalEditor.evaluate();
            }
        }
    }

    const handleCpmDecrease = () => {
        var newCpm = cpm - 1
        if (newCpm < 1 || newCpm > 70) {
            alert("CPM has to be between 1 and 70")
        }
        else {
            setCpm(newCpm)
            SetNewCpm(procText, setProcText, newCpm)
            if (isPlaying) {
                globalEditor.evaluate();
            }
        }
    }

    return (
        <>
            <p className="fs-5 fw-bold ">CPM: {cpm}</p>
            <div className="input-group mb-3">
                <button onClick={handleCpmIncrease} className="btn btn-outline-primary" type="button">+</button>
                <button onClick={handleCpmDecrease} className="btn btn-outline-danger" type="button">-</button>
                <input id="cpmUserInput" type="text" className="form-control" onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter CPM" aria-label="CPM control" />
                <button onClick={() => handleCpmChange(userInput)} className="btn btn-outline-light" type="button" id="button-addon2">Set</button>
            </div>

        </>
    )
}

export default Cpm;

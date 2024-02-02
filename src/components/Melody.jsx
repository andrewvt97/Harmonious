import React, { useState } from "react";
import App from "./App";
import '../styles/App.css'
import Button from "./Button";

function Melody({melody = [], mode, selectedNoteFunction, modifyMelody}) {

    const handleMelodyClick = (MelodyIndex) => {
        if (mode === "Remove Notes"){
            const newMelody = [...melody.slice(0, MelodyIndex), ...melody.slice(MelodyIndex + 1)];

            // Set the new array as the state
            modifyMelody(newMelody);

        }
        else if (mode === "Attach Chords"){
            console.log(MelodyIndex);
            selectedNoteFunction(MelodyIndex);
        }
    };

    return <>
        {/* <ul>
        {melody.map((note, index) => (
          <li key={index}>{note["note"]} {note["chord"] !== 0 ? ":" + note["chord"] : null}</li>
        ))}
      </ul> */}
        
      {melody.map((note, index) => (
            
            note["chord"] === 0 ? (
            <Button key={index} text={note["note"]} onClick={() => handleMelodyClick(index)} />
            ): (
            // <Button key={index} text={note["note"] + note["chord"]} onClick={() => handleMelodyClick(index)} />
            <Button key={index} text={`${note["note"]}\n\n${note["chord"]}`} onClick={() => handleMelodyClick(index)} />
            )
            
        ))}
    </>
}

export default Melody;
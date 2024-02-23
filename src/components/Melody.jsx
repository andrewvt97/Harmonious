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
            selectedNoteFunction(MelodyIndex);
        }
        else if (mode === "Remove Chords"){
            modifyMelody(prevMelody => prevMelody.map((note, i) => (i === MelodyIndex ? { ...note, chord: 0, chordIndex: 0 } : note)));
        }
    };

    return (
    <div className="Melody">      
        {
            melody.map((note, index) => {
                let buttonText;

                if (note["chord"] === 0) {
                    buttonText = note["note"];
                } else {
                    buttonText = `${note["note"]}\n${note["chord"]}`; 
                }
                
                if (note["duration"] === 8){
                    buttonText = "♪" + "\n" + buttonText;
                }
                else if (note["duration"] === 4){
                    buttonText = "♩" + "\n" + buttonText;
                }
                else if (note["duration"] === 2){
                    buttonText = "𝅗𝅥" + "\n" + buttonText;
                }
                else if (note["duration"] === 1){
                    buttonText = "𝅝" + "\n" + buttonText;
                }


                return (
                <Button key={index} text={buttonText}  multiLine = {true} onClick={() => handleMelodyClick(index)} />
                );
            })
        }
    </div>
    );
}

export default Melody;


// ♪
// ♩
// 𝅗𝅥
// 𝅝
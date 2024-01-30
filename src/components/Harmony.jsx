import React, { useState } from "react";
import Button from "./Button";

function Harmony({melody = [], scale = [], harmonyType = "High", harmonyOctave = "Normal", playNotes}){

    const harmonyArray = [];

    const convertToHarmony = (noteDetails) => { 
        let index = 0;
        if (harmonyType === "High"){
            index = noteDetails["scalePos"] + 2;
            if (index > 6)
                noteDetails["range"] += 1;
            noteDetails["note"] = scale[index % 7]["note"];
            noteDetails["scalePos"] = index % 7;
        }
        else{
            index = noteDetails["scalePos"] - 2;
            if (index < 0)
                noteDetails["range"] -= 1;
            noteDetails["note"] = scale[(index + 7) % 7]["note"];
            noteDetails["scalePos"] = (index + 7) % 7;
        }
        if (harmonyOctave === "High")
            noteDetails["range"] += 1;
        else if (harmonyOctave === "Low")
            noteDetails["range"] -= 1;
        
        console.log( noteDetails["note"]);

        // check if harmony note needs to be adjusted for chord
        if (noteDetails["chord"] != 0){
            let chordIndex = noteDetails["chordIndex"];
            // console.log(chordIndex);

            // check all 3 notes of chord
            for (let i = 0; i < 3; i ++){
                if ((noteDetails["scalePos"] + 1) % 7 === chordIndex || (noteDetails["scalePos"] - 1 + 7) % 7 == chordIndex){
                    noteDetails["note"] = scale[chordIndex]["note"];
                    noteDetails["scalePos"] = chordIndex;
                    if (chordIndex === 0)
                        noteDetails["range"] += 1;
                    else if (chordIndex === 6)
                        noteDetails["range"] += 1;
                    break;
                }
                chordIndex = (chordIndex + 2) % 7;
            }
        }

       
        // if (scale[chordIndex] 
    
        
        // Note: NEVER CHANGED INDEX BUT IS THAT IMPORTANT?

        return noteDetails;
    };


    return (
        <>
        <Button text="Play Harmony" onClick={() => playNotes(harmonyArray)}></Button>
        {melody.map((note, index) => {
            // console.log(note);
            let harmonyNote = convertToHarmony({...note});
            harmonyArray.push(harmonyNote);
            
            
            // console.log(harmonyNote);
    
            return note["chord"] === 0 ? (
            <Button key={index} text={harmonyNote["note"]} onClick={() => handleMelodyClick(index)} />
            ) : (
            <Button key={index} text={`${harmonyNote["note"]}\n\n${note["chord"]}`} onClick={() => handleMelodyClick(index)} />
            );
        })}
        </>
  );

}

export default Harmony;
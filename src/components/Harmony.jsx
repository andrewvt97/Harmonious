import React, { useState } from "react";
import Button from "./Button";

function Harmony({melody = [], scale = [], harmonyType = "High", harmonyOctave = "Normal", playNotes}){

    const harmonyArray = [];

    const convertToHarmony = (noteDetails) => { 
        let index = 0;
        if (harmonyType === "High"){
            console.log(scale)
            index = noteDetails["scalePos"] + 2;
     

            if (scale[noteDetails["scalePos"]]["index"] > scale[index % 7]["index"]){
                noteDetails["range"] += 1;
            }
            
            
            noteDetails["note"] = scale[index % 7]["note"];
            noteDetails["scalePos"] = index % 7;
            noteDetails["index"] = scale[index % 7]["index"];
        }
        else{
            index = noteDetails["scalePos"] - 2;
            
            if (scale[noteDetails["scalePos"]]["index"] < scale[(index + 7) % 7]["index"]){
                noteDetails["range"] -= 1;
            }


            noteDetails["note"] = scale[(index + 7) % 7]["note"];
            noteDetails["scalePos"] = (index + 7) % 7;
            noteDetails["index"] = scale[(index + 7) % 7]["index"];
        }
        if (harmonyOctave === "High")
            noteDetails["range"] += 1;
        else if (harmonyOctave === "Low")
            noteDetails["range"] -= 1;
        

        // check if harmony note needs to be adjusted for chord
        if (noteDetails["chord"] != 0){
            let chordIndex = noteDetails["chordIndex"];
            // console.log(chordIndex);

            // check all 3 notes of chord
            for (let i = 0; i < 3; i ++){
                if ((noteDetails["scalePos"] + 1) % 7 === chordIndex || (noteDetails["scalePos"] - 1 + 7) % 7 == chordIndex){
                    noteDetails["note"] = scale[chordIndex]["note"];
                    noteDetails["scalePos"] = chordIndex;
                    

                    // change chord ranges if going from something D# to B or something like that (may need to adjust ranges)
                    if (noteDetails["index"] < 3 && scale[chordIndex]["index"] > 8){
                        noteDetails["range"] -= 1;
                    }
                    // opposite of above
                    else if (noteDetails["index"] > 8 && scale[chordIndex]["index"] < 3){
                        noteDetails["range"] += 1;
                    }


                    break;
                }
                chordIndex = (chordIndex + 2) % 7;
            }
        }

       
        // if (scale[chordIndex] 
    
        
       

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
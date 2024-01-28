import React, { useState } from "react";
import Button from "./Button";

function Harmony({melody = [], scale = [], harmonyType = "High"}){

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
        
    
        
        // Note: NEVER CHANGED INDEX BUT IS THAT IMPORTANT?

        return noteDetails;
    };


    return (
        <>
        {melody.map((note, index) => {
            console.log(note);
            let harmonyNote = convertToHarmony({...note});
            console.log(harmonyNote);
    
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
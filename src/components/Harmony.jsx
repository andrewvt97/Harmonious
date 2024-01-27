import React, { useState } from "react";
import Button from "./Button";

function Harmony({melody = [], scale = []}){

    const convertToHarmony = (noteDetails) => { 
        let index = noteDetails["scalePos"] + 2;
        noteDetails["note"] = scale[index % 7]["note"];
        if (index > 6){
            noteDetails["range"] += 1;
        }
        noteDetails["scalePos"] = index % 7;
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
import React from "react";
import Button from "./Button";

function MusicButtons({currentScale = [], type, melody, setMelody}) {
    
    // needs access to melody and setMelody

    const handleNoteClick = (note) => {
        // Update melody state by adding a new array representing the note and its value
        // setMelody((prevMelody) => [...prevMelody, [note, 0]]);
        setMelody((prevMelody) => [...prevMelody, {"note": note, "chord": 0, "key": "C", "range": 4}]);
      };
   
   
    return (
        <>
        {currentScale.map((note, index) => (
        <Button key={index} text={note} onClick={() => handleNoteClick(note)} />
        ))}
        </>
       
        
    );
    

    
}


export default MusicButtons;
import React from "react";
import Button from "./Button";

function MusicButtons({currentScale = [], type = "note", setMelody}) {
    console.log(type);
    // needs access to melody and setMelody

    const handleNoteClick = (note, index) => {
        // Update melody state by adding a new array representing the note and its value
        // setMelody((prevMelody) => [...prevMelody, [note, 0]]);
        setMelody((prevMelody) => [...prevMelody, {"note": note, "chord": 0, "key": "C", "range": 4, "index": index}]);
      };

    const handleChordClick = (chord, index) => {};
   
   
    return (
        <>
          {currentScale.map((music_item, index) => {
            if (type === "note") {
              return (
                <Button key={index} text={music_item["note"]} onClick={() => handleNoteClick(music_item["note"], music_item["index"])} />
              );
            } else {
              return (
                <Button key={index} text={music_item["chord"]} onClick={() => handleChordClick(music_item["chord"], music_item["index"])} />
              );
            }
          })}
        </>
      );

    
}


export default MusicButtons;
import React from "react";
import Button from "./Button";



function MusicButtons({currentScale = [], type = "note", setMelody, songKey, range, mode, duration, playNote, selectedNote}) {

    // needs access to melody and setMelody
    
    const handleNoteClick = (note, index, scalePosition, noteRange) => {
        playNote(`${note}${noteRange}`, duration);
        if (mode != "Add Notes")
            return
        // Update melody state by adding a new array representing the note and its value
        // setMelody((prevMelody) => [...prevMelody, [note, 0]]);
        setMelody((prevMelody) => [...prevMelody, {"note": note, "chord": 0, "chordIndex": 0, "key": songKey, "range": noteRange, "duration": duration, "index": index, "scalePos": scalePosition}]);
      };

    const handleChordClick = (chord, index, chordPos) => { // index represents note where we want to add chord
        if (mode = "Attach Chords"){
            console.log(chordPos);
            setMelody(prevMelody => prevMelody.map((note, i) => (i === index ? { ...note, chord: chord, chordIndex: chordPos } : note)));
        }
    };
  
    return (
        <>
          {currentScale.map((music_item, index) => {
            if (type === "note") {     
              return (<Button key={index} text={music_item["note"]} onClick={() => handleNoteClick(music_item["note"], music_item["index"], index, range + music_item["adjRange"])} />);        
            } else {
              return (
                <Button key={index} text={music_item["chord"]} onClick={() => handleChordClick(music_item["chord"], selectedNote, index)} />
              );
            }
          })}
        </>
      );

    
}


export default MusicButtons;
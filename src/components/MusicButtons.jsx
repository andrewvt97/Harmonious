import React from "react";
import Button from "./Button";



function MusicButtons({currentScale = [], type = "note", setMelody, songKey, range, mode, duration, playNote, selectedNote}) {


   
      
      
    
    // const playNote = (note, duration) => {
    //     const synth =new Tone.MembraneSynth().toDestination();
    //     // const synth = new Tone.Synth().toDestination();
    //     synth.triggerAttackRelease(note, duration);
    //   };

    // needs access to melody and setMelody
    
    const handleNoteClick = (note, index, scalePosition) => {
        
        playNote(`${note}${range}`, duration);
        if (mode != "Add Notes")
            return
        // Update melody state by adding a new array representing the note and its value
        // setMelody((prevMelody) => [...prevMelody, [note, 0]]);
        setMelody((prevMelody) => [...prevMelody, {"note": note, "chord": 0, "chordIndex": 0, "key": songKey, "range": range, "duration": duration, "index": index, "scalePos": scalePosition}]);
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
                if (mode == "Add Notes"){
                    return (<Button key={index} text={music_item["note"]} onClick={() => handleNoteClick(music_item["note"], music_item["index"], index)} />);
                }
                else {
              return (<Button key={index} text={music_item["note"]} onClick={() => handleNoteClick(music_item["note"], music_item["index"], index)} />);
                }
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
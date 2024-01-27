import React from "react";
import Button from "./Button";
import * as Tone from 'tone';


function MusicButtons({currentScale = [], type = "note", setMelody, songKey, range, mode, selectedNote}) {


    const playNote = (noteNames, duration) => {
        // Create a Tone.Sampler
        const sampler = new Tone.Sampler({
          urls: {
            C3: "single-piano-note-c3_60bpm_C_major.wav",
            C4: "single-piano-note-c4_100bpm_C_major.wav",
            // Add more notes as needed
          },
          baseUrl: "https://andrewvt97.github.io/Audio-Files-Harmonious/",
          onload: () => {
            // Trigger the attack and release for specified notes
            sampler.triggerAttackRelease(noteNames, duration);
          },
        }).toDestination();
      
        // Load the samples
      };
      
      
    
    // const playNote = (note, duration) => {
    //     const synth =new Tone.MembraneSynth().toDestination();
    //     // const synth = new Tone.Synth().toDestination();
    //     synth.triggerAttackRelease(note, duration);
    //   };

    // needs access to melody and setMelody
    
    const handleNoteClick = (note, index) => {
        playNote(`${note}${range}`, 0.5);
        // Update melody state by adding a new array representing the note and its value
        // setMelody((prevMelody) => [...prevMelody, [note, 0]]);
        setMelody((prevMelody) => [...prevMelody, {"note": note, "chord": 0, "key": songKey, "range": range, "index": index}]);
      };

    const handleChordClick = (chord, index) => { // index represents note where we want to add chord
        if (mode = "Attach Chords"){
            setMelody(prevMelody => prevMelody.map((note, i) => (i === index ? { ...note, chord: chord } : note)));
        }
    };
   
   
    return (
        <>
          {currentScale.map((music_item, index) => {
            if (type === "note") {
                if (mode == "Add Notes"){
                    return (<Button key={index} text={music_item["note"]} onClick={() => handleNoteClick(music_item["note"], music_item["index"])} />);
                }
                else {
              return (<Button key={index} text={music_item["note"]} onClick={() => {}} />);
                }
            } else {
              return (
                <Button key={index} text={music_item["chord"]} onClick={() => handleChordClick(music_item["chord"], selectedNote)} />
              );
            }
          })}
        </>
      );

    
}


export default MusicButtons;
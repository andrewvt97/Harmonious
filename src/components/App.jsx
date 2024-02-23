import { useState } from 'react'
import React, { useEffect } from 'react';
import '../styles/App.css'
import Button from './Button';
import Melody from './Melody';
import Harmony from './Harmony';
import MusicButtons from './MusicButtons';

import * as Tone from 'tone';
// import * as Tone from 'tone/Tone/core/Tone.ts';

function App() {

  // need this to set up audio at the start
  useEffect(() => {
    const handleBodyClick = async () => {
      await Tone.start();
      // console.log('audio is ready');
    };

    document.body.addEventListener('click', handleBodyClick, { once: true });

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  
  
  // I understand now! Use the parent component to manage the state variables and pass them down as props to children components
  // I learned another thing. It is common to pass both state variable and state setter function. This is called lifting state.
  // Must use state functions to modify state variables or it won't render properly

  /* I learned another thing! When you have a variable that is dependent on another one, use a useEffect and include the state variables 
  in the dependency array. Ex: Harmony is dependent on melody, harmonyOctave, and harmonyType
  */

  // state variables
  const [melody, setMelody] = useState([]);
  const [harmony, setHarmony] = useState(melody);
  
  const [key, setKey] = useState(0);
  const [noteType, setNoteType] = useState(4);
  const [octave, setOctave] = useState(3);
  const [mode, setMode] = useState("Play");
  const [harmonyOctave, setHarmonyOctave] = useState("Normal");
  const [harmonyType, setHarmonyType] = useState("High");
  const [bpm, setBPM] = useState(60);

  const [selectedMelodyNote, setSelectedMelodyNote] = useState(-1); // I don't want these two to be a state variable

  const convertToHarmony = (noteDetails, scale) => { 
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

    return noteDetails;
};


  useEffect(() => {
    // This function will run every time melody, harmonyType, or harmonyOctave changes.

    const harmonyArray = melody.map(note => {
      // Assuming convertToHarmony can also take harmonyType and harmonyOctave as arguments
      return convertToHarmony({...note}, current_key_scale);
    });

    setHarmony(harmonyArray); // Update the harmony state variable
}, [melody, harmonyType, harmonyOctave]); // Dependency array, useEffect will run when any variable in this array changes

    // constant non-state variables
  const notes = ["C", "C#", "D", "D#", "E" , "F", "F#", "G", "G#", "A", "A#", "B"];
    // major key - 2 whole steps 1 half step 3 whole steps
  // let selectedMelodyNote = -1;
  // const updateSelectedNote = (newNote) => {
  //   selectedMelodyNote = newNote;
  //   // console.log(selectedMelodyNote);
  // };

  const major = [2, 2, 1, 2, 2, 2];
  const current_key_scale = [];
  
  current_key_scale.push({"index":key, "note": notes[key], "adjRange": 0}); // add object with index to transpose easily
  let note_index = key;
  let range = 0;
  for (let i = 0; i < major.length; i++) {
    note_index = (note_index + major[i]) % 12;
    if (notes[note_index][0] === "C")
      range = 1
    current_key_scale.push({"index":note_index, "note":notes[note_index], "adjRange": range})
  }

  const noteButtons = [...current_key_scale];
  let buttonToAdd;

  for (let i = 0; i < current_key_scale.length; i ++){
    buttonToAdd = {...current_key_scale[i]};
    buttonToAdd["adjRange"] += 1;
    noteButtons.push(buttonToAdd);
  }

  // console.log(key, current_key_scale);
  // major key Cmaj Dm Em Fmaj G7 Am Bdim
  const chord_type = {1: "maj", 2: "m", 3: "m", 4: "maj", 5: "7", 6: "m", 7: "dim"};
  const chords = [];
  for (let i = 0; i < current_key_scale.length; i++) {
    // console.log(current_key_scale["index"]);
    chords.push({"index":current_key_scale[i]["index"], "chord" :current_key_scale[i]["note"] + chord_type[i+1]});
  }
  // console.log(current_key_scale);
  // console.log(chords);

  // console.log(current_key_scale);
  // console.log(chords);


  const handleNoteTypeClick = (type) => {
    setNoteType(type);
  };

  const handleBPMChange = (button) => {
      if (button === ">"){
        if (bpm < 240)
          setBPM(bpm + 10)
      }
      else {
        if (bpm > 20)
          setBPM(bpm - 10)
      }
  }

  const handleOctaveClick = (button) => {
    if (button === ">"){
      if (octave !== 8)
        setOctave(octave + 1);
    } 
    else{
      if (octave !== 1)
        setOctave(octave - 1);
    }
  };

  const handleKeyChange = (button) => {
      if (button === ">"){
        setKey((key + 1) % 12) // 12 represents the amount of notes

      }
      else{
        if (key !== 0)
          setKey(key - 1) 
        else
          setKey(11) // 12 represents the amount of notes so len - 1 = 11
      }
  };

  const handleModeChange = (mode) => {
      setMode(mode);
  };

  const handleHarmonyOctaveChange = (octave) => {
      setHarmonyOctave(octave);
  };

  const handleHarmonyTypeChange = (type) => {
    setHarmonyType(type);
  };


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

  const playMelody = (melody) => {
    console.log("Melody:", JSON.stringify(melody));
    // Iterate over each entry in the melody array
    let durationInSeconds = 0;
    let timeToPlayNote = 0;
    melody.forEach((note, index) => {
      // Assuming 'duration' is a property in each melody entry
      timeToPlayNote += durationInSeconds; // add on time it took to play previous notes
      durationInSeconds = 60 / bpm / note["duration"] ;
  
      // Assuming 'note' is a property in each melody entry
      const noteNames = `${note["note"]}${note["range"]}`;
  
      // Call playNote function for each melody entry
      
       // Use an IIFE to capture the current state of 'durationInSeconds' and 'noteNames' 
    (function(noteNames, duration, timeToPlayNote) { 
        setTimeout(() => { 
          playNote(noteNames, duration); 
        }, timeToPlayNote * 1000); // Multiply by the delay time in milliseconds 
      })(noteNames, durationInSeconds, timeToPlayNote); 
    }); 
    }; 



  const playMelodyandHarmony = (melody, harmony) => {
      playMelody(melody);
      playMelody(harmony);
  };

  
  
  // console.log("Melody:", JSON.stringify(melody));
  // console.log("Type:", noteType);
  // console.log("Key:", key);
  // console.log("Mode:", mode);
  return (
    
      <>
        
        <div className='header'>
          <p className='website-name'> ♫ Harmony 🎤</p>
        </div>
        <div className='play-both-button'>
          <Button text="Play Melody and Harmony" onClick={() => playMelodyandHarmony(melody, harmony)}></Button>
        </div>  
        <div className='display'>
          <div className='melody-section'>
            <div className='melody-header'>
              <p> Melody</p>
              <Button text="Play Melody" onClick={() => playMelody(melody)}></Button>
            </div>
            <div className='melody-display'>   
            <Melody melody = {melody} mode = {mode} selectedNoteFunction={setSelectedMelodyNote} modifyMelody={setMelody}></Melody>
            </div>      
          </div>
          <div className='harmony-section'> 
          <div className='harmony-header'>
            <p> Harmony</p>
            <Button text="Play Harmony" onClick={() => playMelody(harmony)}></Button>
          </div>
          <div className='harmony-display'> 
            <Harmony className='harmony-display' harmony = {harmony}></Harmony>
          </div> 
        </div>

          <div className='harmony-settings'> 
            <div className='octave-settings'>
                <p> Harmony Octave</p>
                <div className = "harmony-octave-buttons"> 
                  <Button active = {harmonyOctave === "Normal"} text="Normal" onClick={() => handleHarmonyOctaveChange("Normal")}></Button>
                  <Button active = {harmonyOctave === "High"} text="High" onClick={() => handleHarmonyOctaveChange("High")}></Button>
                  <Button active = {harmonyOctave === "Low"} text="Low" onClick={() => handleHarmonyOctaveChange("Low")}></Button>
                </div>
            </div>
            <div className='chord-note-settings'>
              <p> Harmony Type</p>
              <div className = "harmony-type-buttons"> 
                  <Button active = {harmonyType === "High"} text="High" onClick={() => handleHarmonyTypeChange("High")}></Button>
                  <Button active = {harmonyType === "Low"}text="Low" onClick={() => handleHarmonyTypeChange("Low")}></Button>
              </div>
            </div>
          </div>
        </div>
        <div className='control-section'>
          <div className='music-components'>
            <div className='note-buttons'>
              <p> Notes </p>
              <MusicButtons currentScale={noteButtons} type = "note" setMelody={setMelody} songKey = {notes[key]} range = {octave} mode = {mode} 
              duration = {noteType} bpm = {bpm} playNote={playNote} selectedNote={selectedMelodyNote}></MusicButtons>
            </div>
            <div className='chord-buttons'>
              <p> Chords </p>
              <MusicButtons currentScale={chords} type = "chord" setMelody={setMelody} songKey = {notes[key]} range = {octave} mode = {mode} 
              duration = {noteType} bpm = {bpm} playNote={playNote} selectedNote={selectedMelodyNote}></MusicButtons>
            </div>
          </div>
          <div className='notes-and-bpm'>
            <div className='note-type-buttons'>
              <p> Type</p>
              <div className='note-type-container'>
                <Button active = {noteType === 8} text = {"Eighth"} onClick={() => handleNoteTypeClick(8)}></Button>
                <Button active = {noteType === 4} text = {"Quarter"} onClick={() => handleNoteTypeClick(4)}></Button>
                <Button active = {noteType === 2} text = {"Half"} onClick={() => handleNoteTypeClick(2)}></Button>
                <Button active = {noteType === 1} text = {"Full"}onClick={() => handleNoteTypeClick(1)}></Button>
              </div>
            </div>
            <div className='bpm-buttons'>
                <p> BPM</p>
                  <div className='bpm-container'> 
                    <Button text = {"<"} onClick={() => handleBPMChange("<")}></Button>
                    <p> {bpm} </p>
                    <Button text = {">"} onClick={() => handleBPMChange(">")}></Button>
                  </div>
            </div>   
          </div>
          <div className='range'>
            <div className='adjust-octave-buttons'>
              <p> Octave </p>
              <div className='octave-line-display'>
                <p> {noteButtons[0]["note"]}{octave + noteButtons[0]["adjRange"]}</p>
                <hr className='octave-range'></hr>
                <p> {noteButtons[noteButtons.length-1]["note"]}{octave + noteButtons[noteButtons.length-1]["adjRange"]}</p>
              </div> 
              <div className='octave-buttons'>
                <Button text = {"<"} onClick={() => handleOctaveClick("<")}></Button>
                <p> {octave} </p>
                <Button text = {">"} onClick={() => handleOctaveClick(">")}></Button>
              </div>   
            </div> 
            <div className='adjust-key-buttons'>
              <p> Key </p>
              <div className='key-buttons'>
                <Button text = {"<"} onClick={() => handleKeyChange("<")}></Button>
                <p> {notes[key]} </p>
                <Button text = {">"} onClick={() => handleKeyChange(">")}></Button>
              </div>   
            </div>
          </div>
          <div className='functionality-buttons'>
            <p> Mode</p>
            <div className='mode-buttons'>
              <Button active = {mode === "Play"} text="Play" onClick={() => handleModeChange("Play")}></Button>
              <Button active = {mode === "Add Notes"} text="Add Notes" onClick={() => handleModeChange("Add Notes")}></Button>
              <Button active = {mode === "Remove Notes"} text="Remove Notes" onClick={() => handleModeChange("Remove Notes")}></Button>
              <Button active = {mode === "Attach Chords"} text="Attach Chord" onClick={() => handleModeChange("Attach Chords")}></Button>
              <Button active = {mode === "Remove Chords"} text="Remove Chord" onClick={() => handleModeChange("Remove Chords")}></Button>
            </div>
          </div>
          
        </div>
      </>
  
   
  );
}

export default App;

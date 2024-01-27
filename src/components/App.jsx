import { useState } from 'react'
import React, { useEffect } from 'react';
import '../styles/App.css'
import Button from './Button';
import Melody from './Melody';
import MusicButtons from './MusicButtons';

import * as Tone from 'tone';

function App() {

  // need this to set up audio at the start
  useEffect(() => {
    const handleBodyClick = async () => {
      await Tone.start();
      console.log('audio is ready');
    };

    document.body.addEventListener('click', handleBodyClick, { once: true });

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  
  
  // I understand now! Use the parent component to manage the state variables and pass them down as props to children components
  // I learned another thing. It is common to pass both state variable and state setter function. This is called lifting state.

  // state variables
  const [melody, setMelody] = useState([]);
  const [key, setKey] = useState(0);
  const [noteType, setNoteType] = useState("Quarter");
  const [octave, setOctave] = useState(4);
  const [mode, setMode] = useState("Play");

  const [selectedMelodyNote, setSelectedMelodyNote] = useState(-1);

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
  current_key_scale.push({"index":key, "note": notes[key]}); // add object with index to transpose easily
  let note_index = key;
  for (let i = 0; i < major.length; i++) {
    note_index = (note_index + major[i]) % 12;
    current_key_scale.push({"index":note_index, "note":notes[note_index]})
  }

  // major key Cmaj Dm Em Fmaj G7 Am Bdim
  const chord_type = {1: "maj", 2: "m", 3: "m", 4: "maj", 5: "7", 6: "m", 7: "dim"};
  const chords = [];
  for (let i = 0; i < current_key_scale.length; i++) {
    // console.log(current_key_scale["index"]);
    chords.push({"index":current_key_scale[i]["index"], "chord" :current_key_scale[i]["note"] + chord_type[i+1]});
  }

  // console.log(current_key_scale);
  // console.log(chords);


  const handleNoteTypeClick = (type) => {
    setNoteType(type);
  };

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
  
  // console.log("Melody:", JSON.stringify(melody));
  // console.log("Type:", noteType);
  // console.log("Key:", key);
  // console.log("Mode:", mode);
  return (
    
      <>
        
        <div className='header'>
          <p className='website-name'> Harmonious</p>
        </div>
        <div className='display'>
        <div className='melody-display'> 
          <p> Melody</p>
          <Melody className='melody-display' melody = {melody} mode = {mode} selectedNoteFunction={setSelectedMelodyNote}></Melody>
        </div> 
        <div className='harmony-display'> 
          <p> Harmony</p>
          <p> lo lo lo this is the harmony</p>
        </div> 

          <div className='harmony-settings'> 
            <div className='interval-settings'>
                <p> Interval</p>
            </div>
            <div className='chord-note-settings'>
              <p> Chord Note</p>
            </div>
          </div>
        </div>
        <div className='control-section'>
          <div className='music-components'>
            <div className='note-buttons'>
              <p> Notes </p>
              <MusicButtons currentScale={current_key_scale} type = "note" setMelody={setMelody} songKey = {notes[key]} range = {octave} mode = {mode} 
              selectedNote={selectedMelodyNote}></MusicButtons>
            </div>
            <div className='chord-buttons'>
              <p> Chords </p>
              <MusicButtons currentScale={chords} type = "chord" setMelody={setMelody} songKey = {notes[key]} range = {octave} mode = {mode} 
              selectedNote={selectedMelodyNote}></MusicButtons>
            </div>
          </div>
          <div className='note-type-buttons'>
            <p> Type</p>
            <div className='note-type-container'>
              <Button text = {"Eighth"} onClick={() => handleNoteTypeClick("Eighth")}></Button>
              <Button text = {"Quarter"} onClick={() => handleNoteTypeClick("Quarter")}></Button>
              <Button text = {"Half"} onClick={() => handleNoteTypeClick("Half")}></Button>
              <Button text = {"Full"}onClick={() => handleNoteTypeClick("Full")}></Button>
            </div>
          </div>
          <div className='range'>
            <div className='adjust-octave-buttons'>
              <p> Octave </p>
              <div className='octave-line-display'>
                <p> C{octave}</p>
                <hr className='octave-range'></hr>
                <p> B{octave}</p>
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
              <Button text="Play" onClick={() => handleModeChange("Play")}></Button>
              <Button text="Add Notes" onClick={() => handleModeChange("Add Notes")}></Button>
              <Button text="Remove Notes" onClick={() => handleModeChange("Remove Notes")}></Button>
              <Button text="Attach Chord" onClick={() => handleModeChange("Attach Chords")}></Button>
              <Button text="Remove Chord" onClick={() => handleModeChange("Remove Chords")}></Button>
            </div>
          </div>
          
        </div>
      </>
  
   
  );
}

export default App

import { useState } from 'react'
import '../styles/App.css'
import Button from './Button';
import Melody from './Melody';

function App() {
  


  // I understand now! Use the parent component to manage the state variables and pass them down as props to children components

  // state variables
  const [melody, setMelody] = useState([]);
  const [key, setKey] = useState(0);
  const [noteType, setNoteType] = useState("Quarter");
  const [octave, setOctave] = useState(4);

    // constant non-state variables
  const notes = ["C", "C#", "D", "D#", "E" , "F", "F#", "G", "G#", "A", "A#", "B"];
    // major key - 2 whole steps 1 half step 3 whole steps

  const major = [2, 2, 1, 2, 2, 2];
  const current_key_scale = [];
  current_key_scale.push(notes[key]);
  let note_index = key;
  for (let i = 0; i < major.length; i++) {
    note_index = (note_index + major[i]) % 12;
    current_key_scale.push(notes[note_index])
  }

  // major key Cmaj Dm Em Fmaj G7 Am Bdim
  const chord_type = {1: "maj", 2: "m", 3: "m", 4: "maj", 5: "7", 6: "m", 7: "dim"};
  const chords = [];
  for (let i = 0; i < current_key_scale.length; i++) {
    chords.push(current_key_scale[i] + chord_type[i+1]);
  }

  console.log(current_key_scale);
  console.log(chords);

  const handleNoteClick = (note) => {
    // Update melody state by adding a new array representing the note and its value
    // setMelody((prevMelody) => [...prevMelody, [note, 0]]);
    setMelody((prevMelody) => [...prevMelody, {"note": note, "chord": 0, "key": "C", "range": 4}]);
  };

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
  
  console.log("Melody:", JSON.stringify(melody));
  console.log("Type:", noteType);
  console.log("Key:", key);
  return (
    
      <>
        
        <div className='header'>
          <p className='website-name'> Harmonious</p>
        </div>
        <div className='display'>
        <div className='melody-display'> 
          <p> Melody</p>
          <Melody className='melody-display' melody = {melody}></Melody>
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
              <Button text = {"C"} onClick={() => handleNoteClick("C")}></Button>
              <Button text = {"C#/Db"} onClick={() => handleNoteClick("C#/Db")}></Button>
              <Button text = {"D"} onClick={() => handleNoteClick("D")}></Button>
              <Button text = {"D#/Eb"}onClick={() => handleNoteClick("D#/Eb")}></Button>
              <Button text = {"F"} onClick={() => handleNoteClick("F")}></Button>
              <Button text = {"F#/Gb"} onClick={() => handleNoteClick("F#/Gb")}></Button>
              <Button text = {"G"} onClick={() => handleNoteClick("G")}></Button>
              <Button text = {"G#/Ab"} onClick={() => handleNoteClick("G#/Ab")}></Button>
              <Button text = {"A"} onClick={() => handleNoteClick("A")}></Button>
              <Button text = {"A#/Bb"} onClick={() => handleNoteClick("A#/Bb")}></Button>
              <Button text = {"B"} onClick={() => handleNoteClick("B")}></Button>

            </div>
            <div className='chord-buttons'>
              <p> Chords </p>
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
          </div>
          
        </div>
      </>
  
   
  );
}

export default App

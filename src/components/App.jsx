import { useState } from 'react'
import '../styles/App.css'
import NoteButton from './NoteButton';
import Melody from './Melody';

function App() {
  
  // I understand now! Use the parent component to manage the state variables and pass them down as props to children components

  const [melody, setMelody] = useState([]);

  const handleNoteClick = (note) => {
    // Update melody state by adding a new array representing the note and its value
    setMelody((prevMelody) => [...prevMelody, [note, 0]]);
  };
  
  console.log("Melody:", JSON.stringify(melody));
  return (
    
      <>
        
        <div className='header'>
          <p className='website-name'> Harmonious</p>
        </div>
        <div className='display'>
          <Melody melody = {melody}></Melody>
          <p className='melody-display'> La la la this is the melody</p>
          <p className='harmony-display'> lo lo lo this is the harmony</p>
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
              <NoteButton text = {"C"} onClick={() => handleNoteClick("C")}></NoteButton>
              <NoteButton text = {"C#/Db"} onClick={() => handleNoteClick("C#/Db")}></NoteButton>
              <NoteButton text = {"D"} onClick={() => handleNoteClick("D")}></NoteButton>
              <NoteButton text = {"D#/Eb"}onClick={() => handleNoteClick("D#/Eb")}></NoteButton>
              <NoteButton text = {"F"} onClick={() => handleNoteClick("F")}></NoteButton>
              <NoteButton text = {"F#/Gb"} onClick={() => handleNoteClick("F#/Gb")}></NoteButton>
              <NoteButton text = {"G"} onClick={() => handleNoteClick("G")}></NoteButton>
              <NoteButton text = {"G#/Ab"} onClick={() => handleNoteClick("G#/Ab")}></NoteButton>
              <NoteButton text = {"A"} onClick={() => handleNoteClick("A")}></NoteButton>
              <NoteButton text = {"A#/Bb"} onClick={() => handleNoteClick("A#/Bb")}></NoteButton>
              <NoteButton text = {"B"} onClick={() => handleNoteClick("B")}></NoteButton>

            </div>
            <div className='chord-buttons'>
              <p> Chords </p>
            </div>
          </div>
          <div className='note-type-buttons'>
            <p> Type</p>
          </div>
          <div className='range'>
            <div className='chord-buttons'>
              <p> Octave </p>
            </div> 
            <div className='chord-buttons'>
              <p> Key </p>
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
